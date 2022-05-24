import { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2-browser";
import { Session } from "next-iron-session";
import checkIfAdminTokenValidAndRefresh from "../../../libs/admin/checkIfAdminTokenValidAndRefresh";
import prisma from "../../../prisma/prisma";
import { printErrorStackTrace } from "../../../libs/stackTrace";
import randomSalt from "../../../libs/randomSalt";
import withAdminSession from "../../../libs/admin/adminIronSession";
// import generateAdminToken from "../../../libs/admin/generateAdminToken";
// import handleAdminSessionToken from "../../../libs/admin/handleAdminSessionToken";
// import randomSalt from "../../libs/randomSalt";

export default withAdminSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const isValidToken = await checkIfAdminTokenValidAndRefresh(req.session);
    if (!isValidToken) {
      printErrorStackTrace("/api/admin/addAdmin - unauthorized try (no token)");
      res.status(401).end("Unauthorized");
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
    const hash = await argon2.hash({
      pass: password,
      salt: randomSalt(32),
    });
    //? 2 get user by email
    const user = await prisma.admin.create({
      data: { email, password: hash.encoded },
    });
    // ? 2.5. if user doesn't exist throw a generic error
    if (!user) {
      res.status(200).end("Something went wrong");
      return;
    }

    printErrorStackTrace(`Added new admin: ${user.email}`);
    res.status(200).end(`${user.email}`);
    return;
  }
);
