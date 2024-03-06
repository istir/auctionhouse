import { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2";
// import randomSalt from "../../libs/randomSalt";
import prisma from "../../prisma/prisma";
import withSession from "../../libs/ironSession";
import { Session } from "next-iron-session";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import { printErrorStackTrace, printStackTrace } from "../../libs/stackTrace";
export default withSession(
	async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
		const isValidToken = await checkIfTokenValidAndRefresh(req.session);
		if (!isValidToken) return res.status(400).end("Unauthorized");

		//? 0 if using GET throw an error
		if (req.method === "GET") {
			return res.status(403).end("Forbidden");
		}
		//? 1 get JSON data from request
		let { id, password } = req.body;
		// console.log("password", password);
		const user = await prisma.user.findUnique({
			where: { id },
		});
		console.log("user", user);
		// ? 2.5. if user doesn't exist throw a generic error
		if (!user) {
			return res.status(200).end("Data doesn't exist");
		}
		return argon2
			.verify(user.password, password)
			.then(async () => {
				const sessionToken = req.session.get("user");
				if (sessionToken) {
					req.session.destroy();
					await req.session.save();
				}
				const address = await prisma.address.deleteMany({
					where: { userId: id },
				});
				const tokens = await prisma.token.deleteMany({ where: { userId: id } });
				const cart = await prisma.cart.findUnique({ where: { userId: id } });
				if (cart) {
					const cartDel = await prisma.cart.delete({ where: { userId: id } });
				}
				const auctionsAsBuyer = await prisma.auction.updateMany({
					where: { buyerId: id },
					data: { buyerId: -1 },
				});
				const auctionsAsSeller = await prisma.auction.updateMany({
					where: { sellerId: id },
					data: { sellerId: -1 },
				});
				const bids = await prisma.bid.updateMany({
					where: { userId: id },
					data: { userId: -1 },
				});
				const del = await prisma.user.delete({
					where: { id },
				});
				if (del) {
					printStackTrace(`Deleted user: ${user.email}`);
					return res.status(200).end("User deleted");
				}
				printErrorStackTrace(`Failed to delete user: ${user.email}`);
				return res.status(200).end("Something went wrong");
			})
			.catch((e) => {
				console.log(e);
				if (e.code === -35) return res.status(400).end("Wrong password");
				res.status(200).end("Something went wrong");
				return;
			});
		// res.status(200).end();
		// return;
	},
);
