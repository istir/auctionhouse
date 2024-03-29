import { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2";
// import randomSalt from "../../libs/randomSalt";
import prisma from "../../prisma/prisma";
import withSession from "../../libs/ironSession";
import { Session } from "next-iron-session";
import handleSessionToken from "../../libs/handleSessionToken";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import generateToken from "../../libs/generateToken";
import { printDevStackTrace, printStackTrace } from "../../libs/stackTrace";
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

		//? -1 if session contains token, check if possible to authenticate with it
		const isValidToken = await checkIfTokenValidAndRefresh(req.session);
		if (isValidToken) {
			res.status(200).end(
				JSON.stringify({
					status: "refresh",
				}),
			);
			return;
		}
		//? 0 if using GET throw an error
		if (req.method === "GET") {
			res.status(403).end("Forbidden");
			return;
		}
		//? 1 get JSON data from request
		let { password, rememberMe } = req.body;
		let email = req.body.email as string;
		email = email.toLowerCase().trim();

		// email:string = email.toString()

		// console.log("res", res);
		// return;
		//? 1.5. validate the data
		// if (validateEmail(email) || validatePassword(password)) {
		//   res.status(200).end("Data doesn't exist");
		//   return;
		// }

		//? 2 get user by email
		printDevStackTrace(`RememberMe: ${rememberMe}`);
		const user = await prisma.user.findUnique({
			where: { email },
			include: { cart: true },
		});
		// ? 2.5. if user doesn't exist throw a generic error
		if (!user) {
			res.status(200).end("Data doesn't exist");
			return;
		}
		if (!user.verified) {
			return res.status(200).end("User not verified");
		}
		//? 3. compare hash and password of a user

		argon2
			.verify(user.password, password)
			.then(async () => {
				const token = await generateToken(user.id, rememberMe);
				await handleSessionToken(req.session, token, {
					firstName: user.firstName,
					lastName: user.lastName,
					id: user.id,
					// birthDateAsString: converTdateToString(user.birthDate),
					// birthDate:user.birthDate,
					email: user.email,
					phoneNumber: user.phoneNumber,
				});

				// avatar: true,
				// firstName: true,
				// lastName: true,
				// cart: { include: { items: true } },
				// id: true,
				printStackTrace(`User logged in: ${user.email}`);
				res.status(200).end(
					JSON.stringify({
						status: "OK",
						user: {
							firstName: user.firstName,
							lastName: user.lastName,
							id: user.id,

							avatar: user.avatar,
							cart: user.cart,
						},
					}),
				);
				return;
			})
			.catch((e) => {
				res.status(200).end("Data doesn't exist");
				return;
			});
		// res.status(200).end();
		return;
	},
);
