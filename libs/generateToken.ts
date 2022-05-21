import prisma from "../prisma/prisma";
import randomSalt from "./randomSalt";

export default async function generateToken(
  userId: number,
  shouldRemember?: boolean
) {
  let generatedToken = randomSalt(24);
  let tryAgain = true;
  while (tryAgain === true) {
    tryAgain = false;
    const create = await prisma.token
      .create({
        data: {
          token: generatedToken,
          userId: userId,
          timeGenerated: new Date(),
          validTime: shouldRemember ? "2592000000" : "900000",
        },
      })
      .catch((err) => {
        if (err.code === "P2002") {
          tryAgain = true;
          generatedToken = randomSalt(24);
        }
      });
  }
  return generatedToken;
}
