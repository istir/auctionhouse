import { NextApiRequest, NextApiResponse } from "next";
import { printStackTrace } from "../../libs/stackTrace";
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
      printStackTrace(`Verified user: ${userToVerify.email}`);
      return res
        .status(200)
        .end(
          `<h1>Konto ${userToVerify.email} zweryfikowane.</h1> <a href="/">Auctionhouse</a>`
        );
    }
  } catch {
    return res.status(200).end("Coś poszło nie tak");
  }
  res.status(200).end("Coś poszło nie tak");
}
