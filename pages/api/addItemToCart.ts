import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

import { Session } from "next-iron-session";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import withSession from "../../libs/ironSession";
import { printDevErrorStackTrace } from "../../libs/stackTrace";
// export default withSession(
export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    if (req.method == "GET") {
      res.status(400).end("Wrong method");
      return;
    }
    //? -1 if session contains token, check if possible to authenticate with it
    // const userId = parseInt(req.body.userId as string) || 0;
    // const token = (req.body.token as string) || "";
    const auctionId = parseInt(req.body.auctionId as string) || 0;
    const isValidToken = await checkIfTokenValidAndRefresh(req.session);
    // console.log(isValidToken);
    // const isValidToken = true;
    if (!isValidToken) {
      res.status(401).end("Unauthorized");
      return;
    }
    // if (userId === 0) {
    //   res.status(400).end("Wrong User Id");
    //   return;
    // }
    if (auctionId == 0) {
      res.status(401).end("Wrong auction Id");
      return;
    }
    const auction = await prisma.auction.findUnique({
      where: { id: auctionId },
    });
    if (auction?.buyerId) {
      printDevErrorStackTrace("auction already bought");
      return res.status(400).end("Auction already bought");
    }
    console.log("auction:", auction);
    const user = await prisma.user.findUnique({
      where: { email: isValidToken.user.email },
    });
    if (!user) {
      res.status(401).end("Unauthorized");
      return;
    }
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: { items: true },
    });
    if (cart && auction) {
      const updatedCart = await prisma.cart.update({
        where: { userId: user.id },
        include: { items: true },
        data: { items: { connect: { id: auctionId } } },
      });
      if (!updatedCart) {
        res.status(400).end("No items in cart");
        return;
      }
      res.status(201).end(JSON.stringify(updatedCart));
      return;
    } else if (auction) {
      const items = await prisma.cart.create({
        data: { userId: user.id, items: { connect: { id: auctionId } } },
      });
      res.status(201).end(JSON.stringify(items));
      return;
    } else {
      res.status(401).end("Wrong auction id");
      return;
    }
  }
);
// );
