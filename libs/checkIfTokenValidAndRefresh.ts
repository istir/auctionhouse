import { Session } from "next-iron-session";
import prisma from "../prisma/prisma";

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
) {
  let sessionToken;
  if (token) {
    sessionToken = token;
  } else if (session.get("user") && session.get("user").token) {
    sessionToken = session.get("user").token;
  } else {
    return false;
  }
  // const sessionToken = token ? token : session.get("user").token;
  if (sessionToken) {
    const foundToken = await prisma.token.findUnique({
      where: { token: sessionToken },
    });
    if (foundToken) {
      if (
        foundToken.timeGenerated.valueOf() + foundToken.validTime <
        Date.now()
      ) {
        //* token too old
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
        return session.get("user");
      }
    }
    return false;
  }
}
