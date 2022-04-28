import prisma from "../prisma/prisma";
import sendEmail from "./sendEmail";
import { printErrorStackTrace } from "./stackTrace";

export default async function sendVerificationEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return printErrorStackTrace(`No user with email ${email}`);
  }
  if (user.verified)
    return printErrorStackTrace(`User ${email} is already verified`);
  if (!user.verificationToken)
    return printErrorStackTrace(`User ${user.email} has no verification token`);

  const _m = await sendEmail(
    email,
    `<h1>Witaj w Auctionhouse!</h1><p>Już tylko jeden krok dzieli cię od cieszenia się kontem!</p><a href=${
      process.env.NODE_ENV === "production"
        ? "https://auctionhouse.vercel.app"
        : "http://localhost:3000"
    }/api/verifyAccount?token=${
      user.verificationToken
    }>Aby zweryfikować konto, kliknij w ten link</a>`
  );
  return _m;
}
