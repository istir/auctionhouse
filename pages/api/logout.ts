import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import withSession from "../../libs/ironSession";

import { Session } from "next-iron-session";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    // > ------------------------- how it should work --------------------------- //
    // > 1. remove token from database
    // > 2. remove token from session

    // //? 0 if using GET throw an error
    // if (req.method === "GET") {
    //   res.status(403).end("Forbidden");
    //   return;
    // }
    //? 1  remove token from database
    const sessionToken = req.session.get("user");
    if (sessionToken) {
      await prisma.token.delete({
        where: { token: sessionToken.token },
      });
      //? 2 remove token from session
      req.session.destroy();
      await req.session.save();
    }
    // res.end();
    if (req.method === "GET") res.redirect("/");
    // res.writeHead(302, { Location: "/" });
    res.end();
    return;
  }
);
