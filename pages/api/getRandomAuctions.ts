import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

import { Session } from "next-iron-session";
import { Auction } from "@prisma/client";
// export default withSession(
export default async function getRandomAuctions(
  req: NextApiRequest & { session: Session },
  res: NextApiResponse
) {
  const limit = parseInt(req.query.limit as string) || 10;

  const auctionCount = await prisma.auction.count();
  // const random = Math.floor(Math.random() * auctionCount);
  //   const randoms = [];
  //   for (let i = 0; i < limit; i += 1) {
  //     randoms[i] = Math.floor(Math.random() * auctionCount);
  //   }
  const results: Auction[] = [];

  for (let i = 0; i < limit; i += 1) {
    // randoms[i] = Math.floor(Math.random() * auctionCount);

    const result = await prisma.auction.findFirst({
      where: { dateEnd: { gt: Date.now().toString() } },
      take: 1,
      skip: Math.floor(Math.random() * auctionCount),
    });
    if (result) {
      results[i] = result;
    }
  }

  //   const userId = parseInt(req.query.userId as string) || 0;
  //   if (userId === 0) {
  //     res.status(400).end("Wrong User Id");
  //     return;
  //   }
  //   const auctions = await prisma.auction.findMany({
  //     where: { sellerId: userId, dateEnd: { gt: Date.now().toString() } },

  //     take: limit,
  //     // include: { children: true },
  //   });
  if (!results) {
    res.status(400).end("No auctions");
    return;
  }

  res.status(200).end(JSON.stringify(results));
}
// );
