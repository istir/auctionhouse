import { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2-browser";
import randomSalt from "../../libs/randomSalt";
import prisma from "../../prisma/prisma";
import withSession from "../../libs/ironSession";
import { Session } from "next-iron-session";
import handleSessionToken from "../../libs/handleSessionToken";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import converTdateToString from "../../libs/convertDateToString";
export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    // > ------------------------- how it should work --------------------------- //
    //> -1. if session contains token, check if possible to authenticate with it
    // > 0. if using GET throw an error
    // > 1. get JSON data from request
    // > 1.5. validate the data
    // > 2. get the user by email
    // > 2.5. if user doesn't exist throw a generic error
    // > 3. compare hash and password of a user
    // > 4. if password doesn't work throw a generic error
    // > 5. if successful send back 200 and generate token

    // > -------------------------- generating token ---------------------------- //
    // > 0. generate token
    // > 1. try searching for it in a DB
    // > 1.5.  if already exists generate agane
    // > 2. insert token into db
    async function generateToken(userId: number, shouldRemember?: boolean) {
      let generatedToken = randomSalt(24);
      let goAgane = true;
      while (goAgane === true) {
        goAgane = false;
        const create = await prisma.token
          .create({
            data: {
              token: generatedToken,
              userId: userId,
              timeGenerated: new Date(),
              validTime: shouldRemember ? 2592000000 : 900000,
            },
          })
          .catch((err) => {
            // goAgane = false;
            // console.log(err);
            if (err.code === "P2002") {
              goAgane = true;
              generatedToken = randomSalt(24);
            }
          });
        // console.log(create);
        // const userToken = create;
      }
      // req.session.set("user", userToken);
      return generatedToken;
      // await req.session.save();
      // console.log(getUser);
    }

    //? -1 if session contains token, check if possible to authenticate with it
    const isValidToken = await checkIfTokenValidAndRefresh(req.session);
    if (isValidToken) {
      res.status(200).end("OK");
      return;
    }
    //? 0 if using GET throw an error
    if (req.method === "GET") {
      res.status(403).end("Forbidden");
      return;
    }
    //? 1 get JSON data from request
    let { email, password, rememberMe } = req.body;
    // console.log("res", res);
    // return;
    //? 1.5. validate the data
    // if (validateEmail(email) || validatePassword(password)) {
    //   res.status(200).end("Data doesn't exist");
    //   return;
    // }

    //? 2 get user by email

    const user = await prisma.user.findUnique({
      where: { email },
    });
    // ? 2.5. if user doesn't exist throw a generic error
    if (!user) {
      res.status(200).end("Data doesn't exist");
      return;
    }
    //? 3. compare hash and password of a user

    argon2
      .verify({
        pass: password,
        encoded: user.password,
      })
      .then(async () => {
        const token = await generateToken(user.id, rememberMe);
        await handleSessionToken(req.session, token, {
          firstName: user.firstName,
          lastName: user.lastName,
          // birthDateAsString: converTdateToString(user.birthDate),
          // birthDate:user.birthDate,
          email: user.email,
          phoneNumber: user.phoneNumber,
        });
        res.status(200).end("OK");
        return;
      })
      .catch((e) => {
        res.status(200).end("Data doesn't exist");
        return;
      });
    return;
  }
);
