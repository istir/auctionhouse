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
    let id: number = 0;
    if (req.method === "GET") {
      id = parseInt(req.query.id as string);
      //   return;
    } else {
      id = parseInt(req.body.id as string);
    }

    const user = await prisma.admin.delete({
      where: { id: id },
    });
    // ? 2.5. if user doesn't exist throw a generic error
    if (!user) {
      res.status(200).end("Something went wrong");
      return;
    }

    printErrorStackTrace(`Removed admin: ${user.email}`);
    if (req.method === "GET") {
      res.redirect("/admin/removeAdmin");
    } else {
      res.status(200).end(`${user.email}`);
    }

    return;
  }
);
