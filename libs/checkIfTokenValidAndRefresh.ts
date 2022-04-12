import { Session } from "next-iron-session";
import prisma from "../prisma/prisma";
import checkForEndingAuctions from "./checkForEndingAuctions";
import { ifDev } from "./ifDev";
import { printErrorStackTrace, printStackTrace } from "./stackTrace";
/**
 * function checks if token is valid
 * if it is, it gets refreshed
 * if it isn't, it gets deleted from database and session
 * @param session - iron session object
 * @param token - token string
 * @returns - token:Token & {user:User} if token is valid, false if not
 */
export default async function checkIfTokenValidAndRefresh(
  session: Session,
  token?: string
): Promise<
  | false
  | undefined
  | {
      token: string;
      user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber?: string | undefined;
      };
    }
> {
  // const trace = get();

  // console.log(trace[0].getFunctionName());
  printStackTrace("Checking if token is valid...");

  checkForEndingAuctions();

  if (!session) {
    printErrorStackTrace(
      "NO SESSION FOUND. MAKE SURE TO USE withSession HOOK!!!"
    );
  }
  let sessionToken;
  if (token) {
    sessionToken = token;

    printStackTrace("Token provided");
  } else if (session?.get("user") && session?.get("user")?.token) {
    sessionToken = session.get("user").token;

    printStackTrace("Token found in session " + sessionToken);
  } else {
    printStackTrace("No token found");

    return false;
  }
  // const sessionToken = token ? token : session.get("user").token;
  if (sessionToken) {
    const foundToken = await prisma.token.findUnique({
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
        printStackTrace("Token too old");
        await prisma.token
          .delete({ where: { id: foundToken.id } })
          .catch((err) => {
            console.error(err.code);
          });
        session.unset("user");
        await session.save();
        return false;
      } else {
        //* token refresh

        await prisma.token.update({
          include: { user: true },
          where: { id: foundToken.id },
          data: { timeGenerated: new Date() },
        });
        printStackTrace("Token refreshed");
        const user = session.get("user");
        ifDev && console.log("User found:", user);
        return user;
      }
    }
    printStackTrace("Token not found");
    return false;
  }
  printStackTrace("Token not found");
  return false;
}
