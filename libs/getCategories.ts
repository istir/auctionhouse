import prisma from "../prisma/prisma";

export default async function getCategories() {
  const p = await prisma.categoryParent.findMany({
    include: {
      categories: { include: { auctions: { select: { _count: true } } } },
    },
  });
  return p;
}
