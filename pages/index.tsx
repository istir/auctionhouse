import { Token, User } from ".prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import Head from "next/head";
import { io } from "socket.io-client";
import Header from "../components/header/header";
import checkIfTokenValidAndRefresh from "../libs/checkIfTokenValidAndRefresh";
import withSession from "../libs/ironSession";
import useSWR from "swr";
export const getServerSideProps: GetServerSideProps = withSession(
  async function ({ req }: { req: NextApiRequest & { session: Session } }) {
    // return await getUserFromSession(req);
    const token = await checkIfTokenValidAndRefresh(req.session);
    if (token) {
      return { props: { token: token.token, userId: token.userId } };
    } else {
      return { props: { token: "" } };
    }
  }
);

export default function Home(props: Token & { user?: User }) {
  const fetcher = (url: string) =>
    fetch(url).finally(() => {
      const socket = io();
      socket.on("connect", () => {
        console.log("connect");
        socket.emit("hello");
      });
      socket.on("hello", (data) => {
        console.log("hello", data);
      });

      socket.on("a user connected", () => {
        console.log("a user connected");
      });

      socket.on("disconnect", () => {
        console.log("disconnect");
      });
    });

  useSWR("/api/socketio", fetcher);
  // console.log(data);

  if (props.userId && props.token)
    return <Header userId={props.userId} token={props.token}></Header>;
  return <Header></Header>;
}
