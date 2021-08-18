import { Session } from "next-iron-session";
import prisma from "../prisma/prisma";
import withSession from "./ironSession";

export default async function handleSessionToken(
  session: Session,
  token?: string,
  //   tokenToSave?: string,
  onlySaveOrDestroy?: "save" | "destroy"
) {
  async function destroy() {
    const sessionToken = session.get("user");
    if (sessionToken) {
      session.destroy();
      await session.save();
      await prisma.token.delete({ where: { token: sessionToken } });
    }
  }
  async function save() {
    if (token) {
      session.set("user", token);
      await session.save();
      //   await prisma.token.create({
      //     data: {
      //       token: token.token,
      //       userId: token.userId,
      //       timeGenerated: new Date(),
      //       validTime: token.validTime,
      //     },
      //   });
    }
  }

  if (onlySaveOrDestroy === "destroy") {
    await destroy();
    return;
  }
  if (onlySaveOrDestroy === "save") {
    await save();
    return;
  }
  await destroy();
  await save();
}
