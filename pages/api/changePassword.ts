import { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2-browser";
// import randomSalt from "../../libs/randomSalt";
import prisma from "../../prisma/prisma";
import withSession from "../../libs/ironSession";
import { Session } from "next-iron-session";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import { printErrorStackTrace } from "../../libs/stackTrace";
import randomSalt from "../../libs/randomSalt";
export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const isValidToken = await checkIfTokenValidAndRefresh(req.session);
    if (!isValidToken) return res.status(400).end("Unauthorized");

    //? 0 if using GET throw an error
    if (req.method === "GET") {
      return res.status(403).end("Forbidden");
    }
    //? 1 get JSON data from request
    let { id, previousPassword, password } = req.body;
    // console.log("password", password);
    const user = await prisma.user.findUnique({
      where: { id },
    });
    console.log("user", user);
    // ? 2.5. if user doesn't exist throw a generic error
    if (!user) {
      return res.status(200).end("Data doesn't exist");
    }
    return argon2
      .verify({
        pass: previousPassword,
        encoded: user.password,
      })
      .then(async () => {
        const hash = await argon2.hash({
          pass: password,
          salt: randomSalt(32),
        });
        const changed = await prisma.user.update({
          where: { id },
          data: { password: hash.encoded },
        });
        if (changed) {
          printErrorStackTrace(`Changed password for user: ${user.email}`);
        }
        printErrorStackTrace(
          `Failed to change password for user: ${user.email}`
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
