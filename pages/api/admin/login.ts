import { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2-browser";
import { Session } from "next-iron-session";
import checkIfAdminTokenValidAndRefresh from "../../../libs/admin/checkIfAdminTokenValidAndRefresh";
import prisma from "../../../prisma/prisma";
import generateAdminToken from "../../../libs/admin/generateAdminToken";
import handleAdminSessionToken from "../../../libs/admin/handleAdminSessionToken";
import withAdminSession from "../../../libs/admin/adminIronSession";
// import generateAdminToken from "../../../libs/admin/generateAdminToken";
// import handleAdminSessionToken from "../../../libs/admin/handleAdminSessionToken";
// import randomSalt from "../../libs/randomSalt";

export default withAdminSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const isValidToken = await checkIfAdminTokenValidAndRefresh(req.session);
    if (isValidToken) {
      res.status(200).end(
        JSON.stringify({
          status: "refresh",
        })
      );
      return;
    }
    //? 0 if using GET throw an error
    if (req.method === "GET") {
      res.status(403).end("Forbidden");
      return;
    }
    //? 1 get JSON data from request
    let { password } = req.body;
    let email = req.body.email as string;
    email = email.toLowerCase().trim();

    // console.log("res", res);
    // return;
    //? 1.5. validate the data
    // if (validateEmail(email) || validatePassword(password)) {
    //   res.status(200).end("Data doesn't exist");
    //   return;
    // }

    //? 2 get user by email
    const user = await prisma.admin.findUnique({
      where: { email },
    });
    // ? 2.5. if user doesn't exist throw a generic error
    if (!user) {
      res.status(200).end("Data doesn't exist");
      return;
    }
    //? 3. compare hash and password of a user
    // req.session.set("usr", user);
    // const s = await req.session.save();
    // console.log(s);
    // return;
    // console.log("isvalid", isPasswordValid);
    argon2
      .verify({
        pass: password,
        encoded: user.password,
      })
      .then(async () => {
        console.log("v");
        const token = await generateAdminToken(user.id);
        await handleAdminSessionToken(req.session, token, {
          id: user.id,
          email: user.email,
        });
        console.log("h");
        // avatar: true,
        // firstName: true,
        // lastName: true,
        // cart: { include: { items: true } },
        // id: true,
        res.status(200).end(
          JSON.stringify({
            status: "OK",
            user: {
              id: user.id,
              email: user.email,
            },
          })
        );
        return;
      })
      .catch((e) => {
        console.log(e);
        res.status(200).end("Data doesn't exist");
        return;
      });
    // res.status(200).end("");
    return;
  }
);
