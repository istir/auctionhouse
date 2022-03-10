import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

import { Session } from "next-iron-session";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
// export default withSession(
export default async function handler(
  req: NextApiRequest & { session: Session },
  res: NextApiResponse
) {
  if (req.method == "GET") {
    res.status(400).end("Wrong method");
    return;
  }
  console.log("uga buga");
  //? -1 if session contains token, check if possible to authenticate with it
  const userId = parseInt(req.body.userId as string) || 0;
  const token = (req.body.token as string) || "";
  const auctionId = parseInt(req.body.auctionId as string) || 0;
  const isValidToken = await checkIfTokenValidAndRefresh(req.session);
  console.log(isValidToken);
  // const isValidToken = true;
  if (!isValidToken) {
    res.status(401).end("Unauthorized");
    return;
  }
  if (userId === 0) {
    res.status(400).end("Wrong User Id");
    return;
  }
  if (auctionId == 0) {
    res.status(401).end("Wrong auction Id");
    return;
  }
  const auction = await prisma.auction.findUnique({ where: { id: auctionId } });
  const cart = await prisma.cart.findUnique({
    where: { userId: userId },
    include: { items: true },
  });
  if (cart && auction) {
    const updatedCart = await prisma.cart.update({
      where: { userId: userId },
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
      data: { userId: userId, items: { connect: { id: auctionId } } },
    });
    res.status(201).end(JSON.stringify(items));
    return;
  } else {
    res.status(401).end("Wrong auction id");
    return;
  }
}
// );
