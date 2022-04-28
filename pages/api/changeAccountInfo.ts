import { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2-browser";
// import randomSalt from "../../libs/randomSalt";
import prisma from "../../prisma/prisma";
import withSession from "../../libs/ironSession";
import { Session } from "next-iron-session";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import { printErrorStackTrace } from "../../libs/stackTrace";
import { validateName } from "../../libs/validator";
import handleSessionToken from "../../libs/handleSessionToken";
export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const isValidToken = await checkIfTokenValidAndRefresh(req.session);
    if (!isValidToken) return res.status(400).end("Unauthorized");

    //? 0 if using GET throw an error
    if (req.method === "GET") {
      return res.status(403).end("Forbidden");
    }
    //? 1 get JSON data from request
    let { id, password, firstName, lastName, avatar } = req.body;
    // console.log("password", password);
    console.log(firstName, lastName);
    const user = await prisma.user.findUnique({
      where: { id },
    });

    // ? 2.5. if user doesn't exist throw a generic error
    if (!user) {
      return res.status(200).end("Data doesn't exist");
    }

    if (
      (firstName && validateName(firstName)) ||
      (lastName && validateName(lastName))
    ) {
      return res.status(400).end("Invalid name");
    }

    firstName = firstName || user.firstName;
    lastName = lastName || user.lastName;
    avatar = avatar || user.avatar;

    return argon2
      .verify({
        pass: password,
        encoded: user.password,
      })
      .then(async () => {
        const changed = await prisma.user.update({
          where: { id },
          data: { firstName, lastName, avatar },
          include: { tokens: true },
        });
        if (changed) {
          await handleSessionToken(req.session, "", {
            firstName: changed.firstName,
            lastName: changed.lastName,
            id: changed.id,
            email: changed.email,
            phoneNumber: changed.phoneNumber,
          });
          printErrorStackTrace(`Changed information for user: ${user.email}`);
          return res.status(200).end("OK");
        }
        printErrorStackTrace(
          `Failed to change information for user: ${user.email}`
        );
        return res.status(200).end("Something went wrong");
      })
      .catch((e) => {
        console.log(e);
        if (e.code === -35) return res.status(400).end("Wrong password");
        res.status(200).end("Something went wrong");
        return;
      });
    // res.status(200).end();
    // return;
  }
);
