import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

import { Session } from "next-iron-session";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import withSession from "../../libs/ironSession";
import generateUrl from "../../libs/generateUrl";
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
    const image = req.body.image as string[];
    // const sellerId = req.body.sellerId
    const price = req.body.price as number;
    const categoryId = req.body.categoryId as number;

    console.log(bidding, markdown, name, dateEnd, image, price);
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
    let generatedUrl = generateUrl(name);
    let goAgane = true;
    while (goAgane === true) {
      goAgane = false;
      const c = await prisma.auction
        .create({
          data: {
            name,
            price,
            bidding,
            markdown,
            image,
            dateEnd: new Date(dateEnd).getTime().toString(),
            timesBought: 0,
            usersBought: 0,
            categoryId,
            sellerId: isValidToken.user.id,
            url: generatedUrl,
          },
        })
        .catch((err) => {
          if (err.code === "P2002") {
            goAgane = true;
            generatedUrl = generateUrl(name);
          }
        });
    }
    // const auction = await prisma.auction.create({
    //   data: {
    //     name,
    //     price,
    //     bidding,
    //     markdown,
    //     image,
    //     dateEnd: new Date(dateEnd).getTime().toString(),
    //     timesBought: 0,
    //     usersBought: 0,
    //     categoryId,
    //     sellerId: isValidToken.user.id,
    //     url:generateUrl(name)
    //   },
    // });
    return res.status(200).end("OK");
    // console.log(generateUrl(name));
    // return res.status(200).end("Error");
  }
);
// );
