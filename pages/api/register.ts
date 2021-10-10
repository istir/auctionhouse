import { Address, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2-browser";
import randomSalt from "../../libs/randomSalt";
import prisma from "../../prisma/prisma";
import {
  validateAddress,
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
  validateZipCode,
} from "../../libs/validator";
export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // > ------------------------- how it should work --------------------------- //
  // > 0. if using GET throw an error
  // > 1. get JSON data from request
  // > 1.5. validate the data
  // > 1.6. format the data
  // > 2. encode the password
  // > 3. try inserting into DB
  // > 4. if email is already there throw a generic error
  // > 5. if successful also create an address
  //? 0 if using GET throw an error
  if (req.method === "GET") {
    res.status(401).send("Unauthorized");
    return;
  }
  //? 1 get JSON data from request
  let {
    email,
    firstName,
    lastName,
    password,
    phoneNumber,
    street,
    zipCode,
    city,
    birthDate,
  } = req.body;

  //? 1.5. validate the data
  if (
    validateEmail(email) ||
    validateName(firstName) ||
    validateName(lastName) ||
    validatePassword(password) ||
    validateAddress(street) ||
    validateName(city) ||
    validateZipCode(zipCode) ||
    validatePhoneNumber(phoneNumber) ||
    validateDate(birthDate)
  ) {
    console.error("wrong data");
    res.status(500).end("Wrong data");
    return;
  }
  // street = street.replace(" m. ", "/");
  street = street
    .replace(/^((ul|ulica)\.? ?)?\b/i, "")
    .replace(/ ?m.? ?/, "/")
    .replace(/\w\S*/g, (w: string) => w.replace(/^\w/, (c) => c.toUpperCase())); //* replace ul|ulica case insensitive with nothing, then m. to / and then capitalize first letter of word
  phoneNumber = phoneNumber.replace(/ /g, ""); //* replace spaces with nothing
  phoneNumber = phoneNumber.replace(/-/g, ""); //* replace - with nothing
  zipCode = parseInt(zipCode.toString().replace("-", "")); //* replace - with nothing

  let birthDateAsDateObject = birthDate !== "" ? new Date(birthDate) : "";

  //? 2 encode the password
  //! using argon2-browser
  //! might want to migrate to native node-argon2 but vercel might not like that
  const hash = await argon2.hash({
    pass: password,
    salt: randomSalt(32),
  });

  //? 3  try inserting into DB
  try {
    const created = await prisma.user.create({
      data: {
        birthDate: birthDateAsDateObject,
        email,
        password: hash.encoded,
        firstName,
        lastName,
        phoneNumber,
      },
    });

    try {
      if (created) {
        const address = await prisma.address.create({
          data: {
            city,
            street,
            zipCode,
            userId: created.id,
          },
        });
        res.status(200).end("OK + Address");
        return;
      } else throw new Error("user doesn't exist");
    } catch (error) {
      console.error(error);
      res.status(200).end("OK");
      return;
    }
  } catch (err) {
    //? 4 if email is already there throw a generic error
    console.error(err.code);
    if (err.code === "P2002") {
      res.status(300).end("email already exists"); //TODO: zapytać o kod tutaj
      return;
    }
  }
}
