import { NextApiRequest, NextApiResponse } from "next";
import sendVerificationEmail from "../../libs/sendVerificationEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = Array.isArray(req.query.email)
    ? req.query.email[0]
    : req.query.email;
  console.log(email);

  if (!email) return res.status(400).end();
  const _m = await sendVerificationEmail(email);

  return res.status(200).end("OK");
}
