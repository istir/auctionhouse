import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import checkIfAdminTokenValidAndRefresh from "../../../libs/admin/checkIfAdminTokenValidAndRefresh";
import prisma from "../../../prisma/prisma";
import { printErrorStackTrace } from "../../../libs/stackTrace";
import withAdminSession from "../../../libs/admin/adminIronSession";
import { exampleAuctions } from "../../../example-auctions";
import addAuction from "../../../libs/addAuction";
// import generateAdminToken from "../../../libs/admin/generateAdminToken";
// import handleAdminSessionToken from "../../../libs/admin/handleAdminSessionToken";
// import randomSalt from "../../libs/randomSalt";

export default withAdminSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const isValidToken = await checkIfAdminTokenValidAndRefresh(req.session);
    if (!isValidToken) {
      printErrorStackTrace("/api/admin/addAdmin - unauthorized try (no token)");
      res.status(401).end("Unauthorized");
      return;
    }
    //? 0 if using GET throw an error
    if (req.method === "GET") {
      res.status(403).end("Forbidden");
      return;
    }
    const currentExampleAuctions = await prisma.auction.findMany({
      where: {
        sellerId: 79,
        dateEnd: { gt: Date.now().toString() },
      },
    });

    if (currentExampleAuctions.length > 0)
      return res.status(400).end("Already have example auctions");

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 14);
    const date = new Date(currentDate);
    const all = await exampleAuctions.map(async (exampleAuction) => {
      const a = await addAuction({
        name: exampleAuction.name,
        bidding: exampleAuction.bidding,
        markdown: exampleAuction.markdown,
        dateEnd: date.getTime().toString(),
        image: exampleAuction.image,
        price: exampleAuction.price,
        categoryId: exampleAuction.categoryId,
        sellerId: 79,
      });
      if (a) {
        return true;
      } else {
        return false;
      }
    });
    Promise.all(all).then((a) => {
      if (a.every((e) => e === true)) {
        return res.status(200).end("Success");
      }
      if (a.every((e) => e === false)) {
        return res.status(200).end("Error");
      }
      if (a.some((status) => status === false)) {
        return res.status(200).end("Some failed");
      }
    });
  }
);
