import { Address, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2-browser";
import randomSalt from "../../libs/randomSalt";
import prisma from "../../prisma/prisma";
import withSession from "../../libs/ironSession";
import {
  validateAddress,
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
  validateZipCode,
} from "../../libs/validator";
import { Session } from "next-iron-session";
import handleSessionToken from "../../libs/handleSessionToken";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import converTdateToString from "../../libs/convertDateToString";
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
    include: { children: true },
  });
  if (!category) {
    res.end("Wrong id");
    return;
  }
  res.end(JSON.stringify(category));
}
// );
