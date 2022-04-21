import { Auction } from "@prisma/client";
import prisma from "../prisma/prisma";

export default async function getRandomAuctions(limit: number, count: number) {
  const results: Auction[] = [];

  for (let i = 0; i < limit; i += 1) {
    const result = await prisma.auction.findFirst({
      where: { dateEnd: { gt: Date.now().toString() } },
      include: { bids: true },
      take: 1,
      skip: Math.floor(Math.random() * count),
    });
    if (result) {
      results[i] = result;
    }
  }

  if (!results) {
    return false;
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
  return r;
}
