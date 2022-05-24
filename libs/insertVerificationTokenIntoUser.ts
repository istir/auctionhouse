// import { User } from "@prisma/client";
import prisma from "../prisma/prisma";
import randomSalt from "./randomSalt";
import { printErrorStackTrace } from "./stackTrace";

export default async function insertVerificationTokenIntoUser(
  userId: number,
  verificationToken?: string
) {
  let token = verificationToken || randomSalt(32, true);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;
  let goAgane = true;
  while (goAgane === true) {
    goAgane = false;
    printErrorStackTrace(`Token ${token} already exists, trying again...`);
    return await prisma.user
      .update({
        where: { id: userId },
        data: { verificationToken: token },
      })
      .catch((err) => {
        if (err.code === "P2002") {
          goAgane = true;
          token = randomSalt(32, true);
        }
      })
      .finally(() => {
        return user;
      });
  }
  //   user.verificationToken = verificationToken;
  // return user;
}
