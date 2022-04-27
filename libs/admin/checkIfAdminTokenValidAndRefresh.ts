import { Session } from "next-iron-session";
import prisma from "../../prisma/prisma";
import { printErrorStackTrace, printStackTrace } from "../stackTrace";
/**
 * function checks if token is valid
 * if it is, it gets refreshed
 * if it isn't, it gets deleted from database and session
 * @param session - iron session object
 * @param token - token string
 * @returns - token:Token & {admin:Admin} if token is valid, false if not
 */
export default async function checkIfAdminTokenValidAndRefresh(
  session: Session,
  token?: string
): Promise<
  | false
  | undefined
  | {
      token: string;
      user: {
        id: number;
        email: string;
        updatedAt: string;
      };
    }
> {
  // const trace = get();

  // console.log(trace[0].getFunctionName());
  printErrorStackTrace("Checking if admin token is valid...");

  // checkForEndingAuctions();

  if (!session) {
    printErrorStackTrace(
      "NO SESSION FOUND. MAKE SURE TO USE withSession HOOK!!!"
    );
  }
  let sessionToken;
  if (token) {
    sessionToken = token;

    printErrorStackTrace("Admin token provided");
  } else if (session?.get("usr") && session?.get("usr")?.token) {
    //named so because it's safer, probably
    sessionToken = session.get("usr").token;

    printErrorStackTrace("Admin token found in session " + sessionToken);
  } else {
    printErrorStackTrace("Admin token not found");

    return false;
  }
  // const sessionToken = token ? token : session.get("user").token;
  if (sessionToken) {
    const foundToken = await prisma.adminToken.findUnique({
      where: { token: sessionToken },
    });
    if (foundToken) {
      if (
        foundToken.timeGenerated.valueOf() + parseInt(foundToken.validTime) <
        Date.now()
      ) {
        //* token too old
        // printStackTrace(
        //   `Token generated time: ${foundToken.timeGenerated.valueOf()}`
        // );
        // printStackTrace(`Token valid time: ${foundToken.validTime}`);
        // printStackTrace(
        //   `TokenTime: ${
        //     foundToken.timeGenerated.valueOf() + foundToken.validTime
        //   }`
        // );
        // printStackTrace(`CurrentTime: ${Date.now()}`);
        printErrorStackTrace("Admin token too old");
        await prisma.adminToken
          .delete({ where: { id: foundToken.id } })
          .catch((err) => {
            console.error(err.code);
          });
        session.unset("usr");
        await session.save();
        return false;
      } else {
        //* token refresh

        await prisma.adminToken.update({
          include: { user: true },
          where: { id: foundToken.id },
          data: { timeGenerated: new Date() },
        });
        printErrorStackTrace("Admin token refreshed");
        const user = session.get("usr");
        // ifDev && console.log("User found:", user);

        printStackTrace(`Logged in as admin: ${user.user.email}`);
        // console.log(user);
        user.user.updatedAt = user.user.updatedAt?.getTime() || "";
        return user;
      }
    }
    printErrorStackTrace("Admin token not found");
    return false;
  }
  printErrorStackTrace("Admin token not found");
  return false;
}
