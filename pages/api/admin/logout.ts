import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import prisma from "../../../prisma/prisma";
import withAdminSession from "../../../libs/admin/adminIronSession";
// import generateAdminToken from "../../../libs/admin/generateAdminToken";
// import handleAdminSessionToken from "../../../libs/admin/handleAdminSessionToken";
// import randomSalt from "../../libs/randomSalt";

export default withAdminSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const sessionToken = req.session.get("usr");
    if (sessionToken) {
      await prisma.adminToken.delete({
        where: { token: sessionToken.token },
      });
      //? 2 remove token from session
      req.session.destroy();
      await req.session.save();
    }
    // res.end();
    if (req.method === "GET") res.redirect("/admin");
    // res.writeHead(302, { Location: "/" });
    res.end();
    return;
  }
);
