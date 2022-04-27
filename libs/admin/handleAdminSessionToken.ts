import { Admin } from "@prisma/client";
import { Session } from "next-iron-session";
import prisma from "../../prisma/prisma";

export default async function handleAdminSessionToken(
  session: Session,
  token?: string,
  user?: Omit<Admin, "password" | "createdAt" | "updatedAt">,
  //   tokenToSave?: string,
  onlySaveOrDestroy?: "save" | "destroy"
) {
  async function destroy() {
    const sessionToken = session.get("user")?.token;
    if (sessionToken) {
      session.destroy();
      await session.save();
      await prisma.token.delete({ where: { token: sessionToken } });
    }
  }
  async function save() {
    if (token) {
      if (user) {
        session.set("usr", { token, user });
        // session.set("usr", "UGH");
      } else session.set("usr", { token });

      await session.save();
      console.log("await save");
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
