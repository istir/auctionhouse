import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = Array.isArray(req.query.token)
    ? req.query.token[0]
    : req.query.token;
  try {
    const userToVerify = await prisma.user.update({
      where: { verificationToken: token },
      data: { verified: true },
    });
    if (userToVerify) {
      return res
        .status(200)
        .end(
          `<h1>Konto ${userToVerify.email} zweryfikowane.</h1> <a href="/">Powrót do strony głównej</a>`
        );
    }
  } catch {
    return res.status(200).end("Coś poszło nie tak");
  }
  res.status(200).end("Coś poszło nie tak");
}
