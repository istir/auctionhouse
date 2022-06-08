import { NextApiRequest, NextApiResponse } from "next";

import { Session } from "next-iron-session";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import withSession from "../../libs/ironSession";

import addAuction from "../../libs/addAuction";
import { printStackTrace } from "../../libs/stackTrace";
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
    const categoryId = req.body.categoryId as string;

    // console.log(bidding, markdown, name, dateEnd, image, price, categoryId);
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
    const added = await addAuction({
      name,
      price,
      bidding,
      markdown,
      image,
      dateEnd: new Date(dateEnd).getTime().toString(),
      categoryId: parseInt(categoryId),
      sellerId: isValidToken.user.id,
    });
    if (added) {
      printStackTrace(
        `Added auction: ${added.name} by user ${isValidToken.user.email}`
      );
      return res.status(200).end(JSON.stringify(added));
    }
    return res.status(200).end("Error");
    // let generatedUrl = generateUrl(name);
    // let goAgane = true;
    // while (goAgane === true) {
    //   goAgane = false;
    //   return await prisma.auction
    //     .create({
    //       data: {
    //         name,
    //         price,
    //         bidding,
    //         markdown,
    //         image,
    //         dateEnd: new Date(dateEnd).getTime().toString(),
    //         timesBought: 0,
    //         usersBought: 0,
    //         categoryId: parseInt(categoryId),
    //         sellerId: isValidToken.user.id,
    //         url: generatedUrl,
    //       },
    //     })
    //     .catch((err) => {
    //       printDevStackTrace(`Catch: ${err}`);
    //       if (err.code === "P2002") {
    //         printDevErrorStackTrace("P2002");
    //         goAgane = true;
    //         generatedUrl = generateUrl(name);
    //       }
    //     })
    //     .finally(() => {
    //       printDevStackTrace(`finally, generatedUrl: ${generatedUrl}`);
    //       return res
    //         .status(200)
    //         .end(JSON.stringify({ status: "OK", url: generatedUrl }));
    //     });
    // }

    // return res
    //   .status(200)
    //   .end(JSON.stringify({ status: "OK", url: generatedUrl }));
    // console.log(generateUrl(name));
  }
);
// );
