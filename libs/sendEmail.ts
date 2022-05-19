import { createTransport } from "nodemailer";
import { printDevStackTrace, printErrorStackTrace } from "./stackTrace";

export default async function sendEmail(
  title: string,
  email: string,
  message: string
) {
  if (!email) return;
  const port = process.env.EMAIL_PORT;
  const host = process.env.EMAIL_SMTP_HOST;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;
  if (!port || !host || !user || !pass) return;
  const transporter = createTransport({
    port: parseInt(port),
    secure: false,
    tls: { ciphers: "SSLv3" },
    host: host,
    auth: { user, pass },
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
    from: {
      name: "Auctionhouse",
      address: user,
    },

    to: `${email}`,
    subject: title || "Auctionhouse",

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
