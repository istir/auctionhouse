import { NextApiRequest, NextApiResponse } from "next";

import { Session } from "next-iron-session";
import getItemsInCart from "../../libs/getItemsInCart";
// export default withSession(
export default async function handler(
  req: NextApiRequest & { session: Session },
  res: NextApiResponse
) {
  if (req.method == "POST") {
    res.status(400).end("Wrong method");
    return;
  }
  //? -1 if session contains token, check if possible to authenticate with it

  // const userId = parseInt(req.body.userId as string) || 0;
  const token = (req.body.token as string) || "";
  // const isValidToken = await checkIfTokenValidAndRefresh(req.session, token);
  // if (!isValidToken) {
  //   res.status(401).end("Unauthorized");
  //   return;
  // }

  // if (userId === 0) {
  //   res.status(400).end("Wrong User Id");
  //   return;
  // }
  // const user = await prisma.user.findUnique({
  //   where: { id: userId },
  //   include: { cart: { include: { items: true } } },
  // });

  // if (!user || !user.cart) {
  //   res.status(400).end("No items in cart");
  //   return;
  // }
  const cartItems = await getItemsInCart(req.session, token);
  if (typeof cartItems === "string") {
    res.status(400).end(cartItems);
  } else {
    res.status(200).end(JSON.stringify(cartItems));
  }
}
// );
