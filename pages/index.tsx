import { Token, User } from ".prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import Head from "next/head";
import { io } from "socket.io-client";
import Header from "../components/header/header";
import checkIfTokenValidAndRefresh from "../libs/checkIfTokenValidAndRefresh";
import withSession from "../libs/ironSession";
import useSWR from "swr";
import { simplifiedUser } from "../types";
export const getServerSideProps: GetServerSideProps = withSession(
  async function ({ req }: { req: NextApiRequest & { session: Session } }) {
    // return await getUserFromSession(req);
    const token = await checkIfTokenValidAndRefresh(req.session);
    if (token) {
      return {
        props: {
          token: token.token,
          simplifiedUser: {
            firstName: token.user.firstName,
            lastName: token.user.lastName,
            id: token.user.id,
          },
        },
      };
    } else {
      return { props: { token: "" } };
    }
  }
);

export default function Home(
  props: Token & { simplifiedUser?: simplifiedUser }
) {
  if (props.simplifiedUser && props.token)
    return <Header user={props.simplifiedUser} token={props.token}></Header>;
  return <Header></Header>;
}
