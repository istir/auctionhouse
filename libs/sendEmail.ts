import { createTransport } from "nodemailer";
import { printDevStackTrace, printErrorStackTrace } from "./stackTrace";

export default async function sendEmail(email: string, message: string) {
  if (!email) return;
  const transporter = createTransport({
    service: process.env.EMAIL_PROVIDER,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
  });
  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        printErrorStackTrace(`email verify error: ${error}`);
        reject(error);
      } else {
        printDevStackTrace(`Server is ready to take our messages`);
        resolve(success);
      }
    });
  });

  const mailData = {
    from: "Auctionhouse",

    to: `${email}`,
    subject: `form message`,

    html: message,
  };

  return await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        printErrorStackTrace(`email send error: ${err}`);
        reject(err);
      } else {
        printDevStackTrace(`email send for ${email}`);

        resolve(info);
      }
    });
  });
}
