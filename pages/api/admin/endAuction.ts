import { NextApiRequest, NextApiResponse } from "next";

import { Session } from "next-iron-session";
import checkIfAdminTokenValidAndRefresh from "../../../libs/admin/checkIfAdminTokenValidAndRefresh";
import withAdminSession from "../../../libs/admin/adminIronSession";
import prisma from "../../../prisma/prisma";

export default withAdminSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    if (req.method == "GET") {
      res.status(400).end("Wrong method");
      return;
    }

    const id = req.body.id as string;
    const isValidToken = await checkIfAdminTokenValidAndRefresh(req.session);

    if (!isValidToken) {
      res.status(401).end("Unauthorized");
      return;
    }

    if (id) {
      const auction = await prisma.auction.findFirst({
        where: { id: parseInt(id) },
      });

      if (auction) {
        const a = await prisma.auction.delete({
          where: { id: auction.id },
          // data: { dateEnd: new Date().getTime().toString() },
        });
        if (a) return res.status(200).end("OK");
        return res.status(400).end("Couldn't end auction");
      }
      return res.status(400).end("Auction doesn't exist");
    }
    return res.status(400).end("Wrong id");
  }
);
// );
