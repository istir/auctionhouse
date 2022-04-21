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
  if (!categoryId) {
    res.end("None");
    return;
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    // include: { children: true },
  });
  if (!category) {
    res.end("Wrong id");
    return;
  }
  res.end(JSON.stringify(category));
}
// );
