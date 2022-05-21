import prisma from "../prisma/prisma";

export async function getAllPages() {
  const a =
    (await prisma.auction.count({
      where: { dateEnd: { gt: Date.now().toString() }, buyerId: null },
    })) / 100;
  return a;
}
