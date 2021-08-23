import { Token, User } from ".prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import Head from "next/head";
import Header from "../components/header/header";
import checkIfTokenValidAndRefresh from "../libs/checkIfTokenValidAndRefresh";
import withSession from "../libs/ironSession";
import useSWR from "swr";
import { simplifiedUser } from "../types";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({ req }: { req: NextApiRequest & { session: Session } }) {
    // return await getUserFromSession(req);
    const token = await checkIfTokenValidAndRefresh(req.session);
    if (token) {
      return {
        props: {
          token: token.token,
          user: token.user,
        },
      };
    } else {
      return { props: { token: "" } };
    }
  }
);

export default function Home(props: Token & { user?: simplifiedUser }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  if (props.user && props.token)
    return (
      <Header
        user={props.user}
        token={props.token}
        refresh={refreshData}
      ></Header>
    );
  return <Header refresh={refreshData}></Header>;
}
