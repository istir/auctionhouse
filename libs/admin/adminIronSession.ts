// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from "next-iron-session";
import { env } from "process";

export default function withAdminSession(handler: any) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password:
      process.env.NODE_ENV === "production" && env.SESSION_PASSWORD
        ? env.SESSION_PASSWORD
        : "qwejy1237f89sdasith23jk4h7891fysd89afui1h4h2uiy89gfsa", //* this should be an environment variable
    cookieName: "aid",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });
}
