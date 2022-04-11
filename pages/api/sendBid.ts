import { NextApiRequest, NextApiResponse } from "next";

import { Session } from "next-iron-session";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import withSession from "../../libs/ironSession";
import {
  printDevStackTrace,
  printErrorStackTrace,
} from "../../libs/stackTrace";
import prisma from "../../prisma/prisma";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    if (req.method !== "POST") {
      res.status(400).end("Wrong method");
      return;
    }

    const auctionID = parseInt(req.body.auctionId as string) || 0;
    const offer = parseInt(req.body.offer as string) || 0;

    const isTokenValid = await checkIfTokenValidAndRefresh(req.session);

    if (auctionID !== 0 && offer !== 0 && isTokenValid) {
      //   console.log("AuctionID: " + auctionID + " Offer: " + offer);
      const auction = await prisma.auction.findUnique({
        where: { id: auctionID },
        include: { bids: true },
      });
      if (auction) {
        const price =
          auction.bids.length > 0 &&
          auction.bids[auction.bids.length - 1].offer > auction.price
            ? auction.bids[auction.bids.length - 1].offer
            : auction.price;
        if (offer > price) {
          const bid = await prisma.bid.create({
            data: {
              offer: offer,
              auctionId: auctionID,
              userId: isTokenValid.user.id,
            },
          });
          if (bid) {
            printDevStackTrace("Bid created");
            return res.status(201).end(JSON.stringify(bid));
          }
        }
        printErrorStackTrace(
          `Offer ${offer} is lower than price ${price}. Request by user ${isTokenValid.user.email}`
        );
        return res.status(400).end("Offer is too low");
      }
      printErrorStackTrace(
        `Auction ${auctionID} not found. Request by user ${isTokenValid.user.email}`
      );
      return res.status(400).end("AUCTION NOT FOUND");
    }
    return res.status(400).end("ERROR");
    //   const cartItems = await getItemsInCart(req.session, token);
    //   if (typeof cartItems === "string") {
    //     res.status(400).end(cartItems);
    //   } else {
    //     res.status(200).end(JSON.stringify(cartItems));
    //   }
  }
);
