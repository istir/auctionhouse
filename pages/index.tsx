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
import AuctionCmponent, {
  AuctionComponent,
} from "../components/auction/Auction";
import prisma from "../prisma/prisma";
import { Auction } from "@prisma/client";

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({ req }: { req: NextApiRequest & { session: Session } }) {
    // return await getUserFromSession(req);

    const auctions = await prisma.auction.findMany();
    console.log(auctions);
    const token = await checkIfTokenValidAndRefresh(req.session);
    if (token) {
      return {
        props: {
          token: token.token,
          user: token.user,
          auctions: auctions ? auctions : [],
        },
      };
    } else {
      return { props: { token: "", auctions: auctions ? auctions : [] } };
    }
  }
);

export default function Home(
  props: Token & { user?: simplifiedUser } & { auctions: Auction[] }
) {
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
  return (
    <div>
      <Header refresh={refreshData}></Header>
      {props.auctions.map((value) => (
        <AuctionComponent auction={value} />
      ))}
    </div>
  );
}
