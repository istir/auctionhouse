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

    const itemIds = req.body.itemIds as number[];
    console.log(itemIds);
    if (!itemIds || itemIds.length == 0) {
      return res.status(400).end("No items");
    }
    const isValidToken = await checkIfTokenValidAndRefresh(req.session);
    if (!isValidToken) {
      res.status(401).end("Unauthorized");
      return;
    }
    const items = await prisma.auction.updateMany({
      where: {
        id: {
          in: itemIds,
        },
      },
      data: {
        buyerId: isValidToken.user.id,
      },
    });
    if (!items) return res.status(400).end("Couldn't buy items");
    const toDisonnect = itemIds.map((id) => {
      return { id: id };
    });
    const removeFromCart = await prisma.cart.update({
      where: { userId: isValidToken.user.id },
      data: { items: { disconnect: toDisonnect } },
    });
    return res.status(200).end("OK");
  }
);
// );
