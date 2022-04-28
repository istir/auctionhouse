import { NextApiRequest, NextApiResponse } from "next";
import sendEmail from "../../libs/sendEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;
  console.log(email);

  if (!email) return res.status(400).end();
  console.log("provider", process.env.EMAIL_PROVIDER);
  console.log("user", process.env.EMAIL_USER);
  console.log("pass", process.env.EMAIL_PASSWORD);
  const _m = await sendEmail("keifanel@gmail.com", "test");

  res.status(200).json({ status: "OK" });
}
