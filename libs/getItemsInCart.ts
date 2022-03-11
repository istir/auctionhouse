import { Session } from "next-iron-session";
import prisma from "../prisma/prisma";
import checkIfTokenValidAndRefresh from "./checkIfTokenValidAndRefresh";
import { printDevStackTrace, printErrorStackTrace } from "./stackTrace";

export default async function getItemsInCart(
  session: Session,
  suppliedToken?: string
) {
  if (!session) {
    printErrorStackTrace("No session found");
    return;
  }
  const token = await checkIfTokenValidAndRefresh(session, suppliedToken);
  if (!token) {
    printErrorStackTrace("No token");
    return;
  }
  const user = await prisma.user.findUnique({
    where: { id: token.user.id },
    include: { cart: { include: { items: true } } },
  });
  if (user?.cart) {
    if (user?.cart?.items) {
      printDevStackTrace(`Length of items in cart: ${user.cart.items.length}`);
      return user.cart.items;
    } else {
      printErrorStackTrace("No items in cart");
      return;
    }
  } else {
    printErrorStackTrace("No cart");
    return;
  }
  //   return user?.cart?.items;
}
