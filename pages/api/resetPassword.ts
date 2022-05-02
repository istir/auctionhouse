import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import {
  printDevStackTrace,
  printErrorStackTrace,
} from "../../libs/stackTrace";
import { Session } from "next-iron-session";
import argon2 from "argon2-browser";
import randomSalt from "../../libs/randomSalt";

// export default withSession(
export default async function search(
  req: NextApiRequest & { session: Session },
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return res.status(400).send("Bad Request");
  }
  const token = req.body.token as string;
  const password = req.body.password as string;
  if (!token || !password) {
    // printErrorStackTrace(`Wrong email: ${email}`);
    return res.status(400).end("Wrong data");
  }

  const user = await prisma.user.findUnique({
    where: { verificationToken: token },
  });

  if (user) {
    printDevStackTrace(`User found for token: ${token} at /api/resetPassword`);

    // const u = await prisma.user.update({where: {id: user.id}, data: {verificationToken: user.id}});
    // const passworrd = password
    const hash = await argon2.hash({
      pass: password,
      salt: randomSalt(32),
    });
    const u = await prisma.user.update({
      where: { id: user.id },
      data: { password: hash.encoded, verificationToken: null },
    });
  } else {
    printErrorStackTrace(
      `No user found for token: ${token} at /api/resetPassword`
    );
  }
  res.status(200).end("OK");
  return;
}
// );
