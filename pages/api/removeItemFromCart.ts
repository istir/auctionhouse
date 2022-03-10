import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

import { Session } from "next-iron-session";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import withSession from "../../libs/ironSession";
// export default withSession(
export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    if (req.method == "GET") {
      res.status(400).end("Wrong method");
      return;
    }

    const auctionId = parseInt(req.body.auctionId as string) || 0;
    const isValidToken = await checkIfTokenValidAndRefresh(req.session);

    if (!isValidToken) {
      res.status(401).end("Unauthorized");
      return;
    }

    if (auctionId == 0) {
      res.status(401).end("Wrong auction Id");
      return;
    }
    // const auction = await prisma.auction.findUnique({
    //   where: { id: auctionId },
    // });
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
    if (cart) {
      const updatedCart = await prisma.cart.update({
        where: { userId: user.id },
        include: { items: true },
        data: { items: { disconnect: { id: auctionId } } },
      });
      if (!updatedCart) {
        res.status(400).end("No items in cart");
        return;
      }
      res.status(201).end(JSON.stringify(updatedCart));
      return;
    } else {
      res.status(401).end("Wrong auction id");
      return;
    }
  }
);
// );
