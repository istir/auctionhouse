import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import {
  printDevStackTrace,
  printErrorStackTrace,
} from "../../libs/stackTrace";
import { Session } from "next-iron-session";
import sendEmail from "../../libs/sendEmail";
import insertVerificationTokenIntoUser from "../../libs/insertVerificationTokenIntoUser";
// export default withSession(
export default async function search(
  req: NextApiRequest & { session: Session },
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return res.status(400).send("Bad Request");
  }
  const email = req.body.email as string;

  if (!email) {
    printErrorStackTrace(`Wrong email: ${email}`);
    return res.status(400).end("Wrong email");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    printDevStackTrace(`User found for email: ${email} at /api/forgotPassword`);

    // const u = await prisma.user.update({where: {id: user.id}, data: {verificationToken: user.id}});
    const u = await insertVerificationTokenIntoUser(user.id);
    if (u) {
      //TODO SEND

      sendEmail(
        "Resetowania hasła Auctionhouse",
        user.email,
        `<h1>Dzieli Cię tylko krok od resetu hasła w serwisie Auctionhouse!</h1><p>Aby potwierdzić chęć zmiany hasła <a href="${
          process.env.NODE_ENV === "production"
            ? "https://auctionhouse.vercel.app"
            : "http://localhost:3000"
        }/reset-password/${u.verificationToken}">naciśnij ten link.</a></p>`
      );
    }
  } else {
    printErrorStackTrace(
      `No user found for email: ${email} at /api/forgotPassword`
    );
  }
  res.status(200).end("OK");
  return;
}
// );
