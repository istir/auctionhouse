import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import {
  printDevStackTrace,
  printErrorStackTrace,
} from "../../libs/stackTrace";
import { Session } from "next-iron-session";
// export default withSession(
export default async function search(
  req: NextApiRequest & { session: Session },
  res: NextApiResponse
) {
  const query = req.body.query as string;
  const searchInDescriptions = req.body.desc as string;
  printDevStackTrace(searchInDescriptions);
  const removedSpaces = query.replace(/ /g, "");
  if (!query || removedSpaces.length < 3 || query.length > 50) {
    printErrorStackTrace(`Wrong query: ${query}`);
    return res.status(400).end("Wrong query");
  }

  const auctions = await prisma.auction.findMany({
    // where: { name: { contains: },
    // take: 100,
    where: {
      OR: [{ name: { search: query.split(" ").join(" & ") } }],
    },
  });
  //   const auctions = await prisma.auction.findMany({
  //     where: { sellerId: userId, dateEnd: { gt: Date.now().toString() } },

  //     take: limit,
  //     // include: { children: true },
  //   });
  if (!auctions) {
    printErrorStackTrace(`No auctions found for query: ${query}`);
    res.status(400).end("No auctions");
    return;
  }
  printDevStackTrace(`Found ${auctions.length} auctions for query: ${query}`);
  printDevStackTrace(`Auctions: ${JSON.stringify(auctions)}`);
  res.status(200).end(JSON.stringify(auctions));
}
// );
