import { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer";

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
  const transporter = createTransport({
    service: process.env.EMAIL_PROVIDER,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
  });
  //aaa
  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log("verify error", error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const mailData = {
    from: "Auctionhouse",

    to: `${email}`,
    subject: `form message`,
    text: `testowa wiadomość wysłana z ${
      process.env.NODE_ENV === "production" ? "prod" : "dev"
    }`,
    html: `<p>testowa wiadomość wysłana z ${
      process.env.NODE_ENV === "production" ? "prod" : "dev"
    }</p>`,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });

  res.status(200).json({ status: "OK" });
}
