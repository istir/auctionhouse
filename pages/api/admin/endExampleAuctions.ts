import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import checkIfAdminTokenValidAndRefresh from "../../../libs/admin/checkIfAdminTokenValidAndRefresh";
import prisma from "../../../prisma/prisma";
import { printErrorStackTrace } from "../../../libs/stackTrace";
import withAdminSession from "../../../libs/admin/adminIronSession";
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
    const currentExampleAuctions = await prisma.auction.updateMany({
      where: {
        sellerId: 79,
      },
      data: {
        dateEnd: Date.now().toString(),
      },
    });
    if (currentExampleAuctions) return res.status(200).end("OK");
    return res.status(400).end();
  }
);
