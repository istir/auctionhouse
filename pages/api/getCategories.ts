import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

import { Session } from "next-iron-session";
// export default withSession(
export default async function getCategories(
  req: NextApiRequest & { session: Session },
  res: NextApiResponse
) {
  let categoryId;
  if (req.method === "POST") {
    console.log(req.body);
    categoryId = req.body.categoryId;
  } else {
    categoryId = req.query.categoryId;
  }
  if (categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      // select: {
      //   id: true,
      //   name: true,
      //   CategoryParent: { select: { name: true, id: true } },
      // },
      // include: { children: true },
    });
    if (!category) {
      res.status(200).end("Wrong id");
      return;
    }
    res.status(200).end(JSON.stringify(category));
  } else {
    const category = await prisma.categoryParent.findMany({
      select: {
        id: true,
        name: true,
        categories: { select: { id: true, name: true } },
      },
      // include: { children: true },
    });
    if (!category) {
      res.status(200).end("No categories");
      return;
    }
    res.status(200).end(JSON.stringify(category));
  }
}
// );
