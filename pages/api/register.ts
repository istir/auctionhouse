import { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2-browser";
import randomSalt from "../../libs/randomSalt";
import prisma from "../../prisma/prisma";
import { validateRegisterData } from "../../libs/validator";
import withSession from "../../libs/ironSession";
import { Session } from "next-iron-session";
import sendVerificationEmail from "../../libs/sendVerificationEmail";
import {
  printDevStackTrace,
  printErrorStackTrace,
  printStackTrace,
} from "../../libs/stackTrace";
import insertVerificationTokenIntoUser from "../../libs/insertVerificationTokenIntoUser";
import unifyRegisterData from "../../libs/unifyRegisterData";
export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
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
      firstName,
      lastName,
      password,
      phoneNumber,
      street,
      zipCode,
      city,
      birthDate,
    } = req.body;
    let email = req.body.email as string;
    email = email.toLowerCase().trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    //? 1.5. validate the data
    if (
      !validateRegisterData({
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
        street,
        zipCode,
        city,
        birthDate,
      })
    ) {
      console.error("wrong data");
      res.status(200).end("Wrong data");
      return;
    }
    // street = street.replace(" m. ", "/");

    const unifiedData = unifyRegisterData({
      street,
      phoneNumber,
      zipCode,
      birthDate,
    });
    //? 2 encode the password
    const hash = await argon2.hash({
      pass: password,
      salt: randomSalt(32),
    });

    //? 3  try inserting into DB
    try {
      const created = await prisma.user.create({
        data: {
          birthDate: unifiedData.birthDate,
          email,
          password: hash.encoded,
          firstName,
          lastName,
          phoneNumber: unifiedData.phoneNumber,
          // verificationToken: randomSalt(32, true),
        },
      });
      console.log(created);
      //* auto login after registration, turned off because need to verify first
      // const token = await generateToken(created.id, true);
      // console.log("TOKEN", token);
      // const t = await handleSessionToken(req.session, token, {
      //   firstName: created.firstName,
      //   lastName: created.lastName,
      //   id: created.id,
      //   // birthDateAsString: converTdateToString(user.birthDate),
      //   // birthDate:user.birthDate,
      //   email: created.email,
      //   phoneNumber: created.phoneNumber,
      // });
      if (created) {
        printStackTrace(`User created: ${created.email}`);
        const u = await insertVerificationTokenIntoUser(created.id);
      }
      try {
        if (created) {
          const mailSent = await sendVerificationEmail(created.email);
          if (mailSent) {
            printDevStackTrace(`mail sent to ${created.email}`);
          } else {
            printErrorStackTrace(`mail not sent to ${created.email}`);
          }
          const address = await prisma.address.create({
            data: {
              city,
              street: unifiedData.street,
              zipCode: unifiedData.zipCode,
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
    } catch (err: any) {
      //? 4 if email is already there throw a generic error
      console.log(err);
      console.error("ERROR", err.code);
      if (err.code === "P2002") {
        res.status(200).end("email already exists"); //TODO: zapytać o kod tutaj
        return;
      }
    }
  }
);
