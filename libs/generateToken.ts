import prisma from "../prisma/prisma";
import randomSalt from "./randomSalt";

export default async function generateToken(
  userId: number,
  shouldRemember?: boolean
) {
  let generatedToken = randomSalt(24);
  let goAgane = true;
  while (goAgane === true) {
    goAgane = false;
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
        // goAgane = false;
        // console.log(err);
        if (err.code === "P2002") {
          goAgane = true;
          generatedToken = randomSalt(24);
        }
      });
    // console.log(create);
    // const userToken = create;
  }
  // req.session.set("user", userToken);
  return generatedToken;
  // await req.session.save();
  // console.log(getUser);
}
