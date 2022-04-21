import { Box } from "@chakra-ui/react";
import { Auction, Token, User } from "@prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import AuctionsGrid from "../components/auction/AuctionsGrid";
import Header from "../components/header/header";
import checkIfTokenValidAndRefresh from "../libs/checkIfTokenValidAndRefresh";
import withSession from "../libs/ironSession";
import { printDevStackTrace } from "../libs/stackTrace";
import prisma from "../prisma/prisma";

interface SearchProps {
  user?: User;
  auctions: Auction[];
  token: Token;
}
export const getServerSideProps: GetServerSideProps = withSession(
  async function ({
    req,
    query,
  }: {
    req: NextApiRequest & { session: Session };

    query: { q: string };
  }) {
    printDevStackTrace(`Query: ${query.q}`);
    const removedSpaces = query.q && query.q.replace(/ /g, "");

    let auctions: Auction[] = [];
    if (!query.q || removedSpaces.length < 3 || query.q.length > 50) {
      auctions = [];
    } else {
      auctions = await prisma.auction.findMany({
        where: {
          name: { search: query.q.split(" ").join(" & ") },
        },
      });
    }

    // printDevStackTrace(`Auctions: ${JSON.stringify(auctions)}`);
    // console.log(auctions);
    const token = await checkIfTokenValidAndRefresh(req.session);
    if (token) {
      const user = await prisma.user.findUnique({
        where: { id: token.user.id },
        select: {
          avatar: true,
          firstName: true,
          lastName: true,
          cart: { include: { items: true } },
          id: true,
        },
      });
      if (user) {
        return {
          props: {
            token: token.token,
            user: user,
            auctions: auctions ? auctions : [],
          },
        };
      }
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

export default function Search(props: SearchProps): JSX.Element {
  const router = useRouter();
  const refreshData = () => {
    router.push(router.asPath);
  };
  return (
    <Box>
      <Header
        user={props.user}
        refresh={refreshData}
        token={props.token.token}
      />
      {props.auctions.length === 0 && <Box>Nie znaleziono aukcji.</Box>}
      <AuctionsGrid auctions={props.auctions} />
    </Box>
  );
}
