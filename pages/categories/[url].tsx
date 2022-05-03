import { Box } from "@chakra-ui/react";
import { Auction, Bid, User } from "@prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import AuctionsGrid from "../../components/auction/AuctionsGrid";
import Header from "../../components/header/header";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import withSession from "../../libs/ironSession";
import { printDevStackTrace } from "../../libs/stackTrace";
import prisma from "../../prisma/prisma";

interface CategoriesByNameProps {
  user?: User;
  auctions: (Auction & { bids: Bid[] })[];
}
export const getServerSideProps: GetServerSideProps = withSession(
  async function ({
    req,
    params,
    query,
  }: {
    req: NextApiRequest & { session: Session };
    params: { url: string };
    query: { q: string };
  }) {
    printDevStackTrace(`Query: ${query.q}`);
    const removedSpaces = query.q && query.q.replace(/ /g, "");

    let auctions: Auction[] = [];
    if (!query.q || removedSpaces.length < 3 || query.q.length > 50) {
      auctions = await prisma.auction.findMany({
        where: {
          category: { url: params.url },
          dateEnd: { gt: Date.now().toString() },
        },
        include: { bids: true },
      });
    } else {
      auctions = await prisma.auction.findMany({
        where: {
          AND: [
            {
              category: {
                url: params.url,
              },
            },
            { name: { search: query.q.split(" ").join(" & ") } },
            { dateEnd: { gt: Date.now().toString() } },
          ],
        },
        include: { bids: true },
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
            user: user,
            auctions: auctions ? auctions : [],
          },
        };
      }
      return {
        props: {
          user: token.user,
          auctions: auctions ? auctions : [],
        },
      };
    } else {
      return { props: { auctions: auctions ? auctions : [] } };
    }
  }
);

export default function CategoriesByName(
  props: CategoriesByNameProps
): JSX.Element {
  const router = useRouter();
  const refreshData = () => {
    router.push(router.asPath);
  };
  return (
    <Box>
      <Header user={props.user} refresh={refreshData} />
      {props.auctions.length === 0 && <Box>Nie znaleziono aukcji.</Box>}
      <AuctionsGrid auctions={props.auctions} />
    </Box>
  );
}
