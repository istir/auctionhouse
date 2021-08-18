import { NextApiRequest, NextApiResponse } from "next";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import prisma from "../../prisma/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = JSON.parse(req.body);
  const foundUser = await prisma.user.findUnique({ include: { tokens: true }, where: { id } });
  foundUser?.tokens.forEach(token=>{checkIfTokenValidAndRefresh()})
};
