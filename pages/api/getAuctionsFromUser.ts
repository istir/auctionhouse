import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

import { Session } from "next-iron-session";
// export default withSession(
export default async function getAuctionsFromUser(
  req: NextApiRequest & { session: Session },
  res: NextApiResponse
) {
  //   let categoryId;
  //   if (req.method === "POST") {
  //     console.log(req.body);
  //     categoryId = req.body.categoryId;
  //   } else {
  //     categoryId = req.query.categoryId;
  //   }
  const limit = parseInt(req.query.limit as string) || 10;
  const userId = parseInt(req.query.userId as string) || 0;
  if (userId === 0) {
    res.status(400).end("Wrong User Id");
    return;
  }
  const auctions = await prisma.auction.findMany({
    where: { sellerId: userId, dateEnd: { gt: Date.now().toString() } },

    take: limit,
    // include: { children: true },
  });
  if (!auctions) {
    res.status(400).end("No auctions");
    return;
  }
  res.status(200).end(JSON.stringify(auctions));
}
// );
