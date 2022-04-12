import prisma from "../prisma/prisma";
import { printDevStackTrace, printStackTrace } from "./stackTrace";

/*
 * scuffed version
 * it probably should be ran in a cronjob but it won't work in a serverless environment
 * instead, every request to the server (or more likely every checkIfTokenValidAndRefresh) will run it.
 * not a terrible idea for a small app like this one, but not that good if there's going to be multiple requests per second later on.
 */
// export default withSession(
export default async function checkForEndingAuctions() {
  printStackTrace("Ending auctions...");
  const auctions = await prisma.auction.findMany({
    where: {
      bidding: true,
      dateEnd: { lt: Date.now().toString() },
      buyerId: null,
    },
    include: { bids: true },
  });

  auctions.forEach(async (auction) => {
    if (auction.bids.length > 0) {
      const winningBid = auction.bids[auction.bids.length - 1];
      await prisma.auction
        .update({
          where: { id: auction.id },
          data: { buyerId: winningBid.userId, originalPrice: winningBid.offer },
        })
        .then((ful) => {
          printDevStackTrace(
            `Auction "${auction.name}" set as won by userId "${winningBid.userId}"`
          );
        });
    }
  });
  printStackTrace("Auctions ended");
}
// );
