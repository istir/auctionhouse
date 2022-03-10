import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

import { Session } from "next-iron-session";
import { Auction } from "@prisma/client";
import { ifDev } from "../../libs/ifDev";
// export default withSession(
export default async function getRandomAuctions(
  req: NextApiRequest & { session: Session },
  res: NextApiResponse
) {
  const limit = parseInt(req.query.limit as string) || 10;
  ifDev && console.log("GET RANDOM AUCTIONS");
  const auctionCount = await prisma.auction.count();
  const results: Auction[] = [];

  for (let i = 0; i < limit; i += 1) {
    const result = await prisma.auction.findFirst({
      where: { dateEnd: { gt: Date.now().toString() } },
      take: 1,
      skip: Math.floor(Math.random() * auctionCount),
    });
    if (result) {
      results[i] = result;
    }
  }

  if (!results) {
    res.status(400).end("No auctions");
    return;
  }
  //remove duplicates
  const r1 = results.filter((result) => result);
  const r = r1.filter((thing, index) => {
    const _thing = JSON.stringify(thing);
    return (
      index ===
      r1.findIndex((obj) => {
        return JSON.stringify(obj) === _thing;
      })
    );
  });
  // console.log(results.filter((result) => result));
  ifDev && console.log(r);
  res.status(200).end(JSON.stringify(r));
}
// );
