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

    const bidding = req.body.bidding as boolean;
    const markdown = req.body.markdown as string;
    const name = req.body.name as string;
    const dateEnd = req.body.dateEnd as string;
    const price = req.body.price as number;
    const categoryId = req.body.categoryId as string;
    const id = parseInt(req.body.id as string);
    if (!id) return res.status(400).end("Wrong id");
    console.log(bidding, markdown, name, dateEnd, price, categoryId);
    // const auctionId = parseInt(req.body.auctionId as string) || 0;
    const isValidToken = await checkIfTokenValidAndRefresh(req.session);

    if (!isValidToken) {
      res.status(401).end("Unauthorized");
      return;
    }
    // if (userId === 0) {
    //   res.status(400).end("Wrong User Id");
    //   return;
    // }
    if (!name || !price) {
      res.status(400).end("Error");
      return;
    }
    // god help me
    if (
      new Date(
        new Date(dateEnd).getTime() - new Date().getTimezoneOffset() * 60000
      ).getTime() <
      new Date(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1,
          new Date().getHours(),
          new Date().getMinutes()
        ).getTime() -
          new Date().getTimezoneOffset() * 60000
      ).getTime()
    )
      return res.status(400).end("Wrong time");
    const auction = await prisma.auction.findUnique({ where: { id } });
    if (auction?.buyerId)
      return res.status(400).end("Auction is already bought");
    const modified = await prisma.auction.update({
      where: { id },
      data: {
        name,
        price,
        bidding,
        markdown,
        dateEnd: new Date(dateEnd).getTime().toString(),
        categoryId: parseInt(categoryId),
      },
    });

    if (modified)
      return res
        .status(200)
        .end(JSON.stringify({ status: "OK", url: modified.url }));

    // return res
    //   .status(200)
    //   .end(JSON.stringify({ status: "OK", url: generatedUrl }));
    // console.log(generateUrl(name));
    // return res.status(200).end("Error");
  }
);
// );
