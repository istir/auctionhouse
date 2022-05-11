import prisma from "../prisma/prisma";
import generateUrl from "./generateUrl";
import { printDevErrorStackTrace, printDevStackTrace } from "./stackTrace";

export default async function addAuction({
  name,
  price,
  bidding,
  markdown,
  image,
  dateEnd,
  categoryId,
  sellerId,
}: {
  name: string;
  price: number;
  bidding: boolean;
  markdown: string;
  image: string[];
  dateEnd: string;
  categoryId: number;
  sellerId: number;
}) {
  let generatedUrl = generateUrl(name);
  let goAgane = true;
  while (goAgane === true) {
    goAgane = false;
    return await prisma.auction
      .create({
        data: {
          name,
          price,
          bidding,
          markdown,
          image,
          dateEnd,
          timesBought: 0,
          usersBought: 0,
          categoryId: categoryId,
          //   sellerId: isValidToken.user.id,
          sellerId: sellerId,
          url: generatedUrl,
        },
      })
      .catch((err) => {
        printDevStackTrace(`Catch: ${err}`);
        if (err.code === "P2002") {
          printDevErrorStackTrace("P2002");
          goAgane = true;
          generatedUrl = generateUrl(name);
        }
      })
      .finally(() => {
        printDevStackTrace(`finally, generatedUrl: ${generatedUrl}`);
        return { status: "OK", url: generatedUrl };
      });
  }
}
