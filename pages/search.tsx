import { Box } from "@chakra-ui/react";
import { Auction, Bid, User } from "@prisma/client";
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
  auctions: (Auction & { bids: Bid[] })[];
  page: number;
  allPages: number;
}
export const getServerSideProps: GetServerSideProps = withSession(
  async function ({
    req,
    query,
  }: {
    req: NextApiRequest & { session: Session };

    query: { q: string; p: string };
  }) {
    printDevStackTrace(`Query: ${query.q}`);
    const page = parseInt(query.p) || 1;
    let pages: number = 0;

    const removedSpaces = query.q && query.q.replace(/ /g, "");

    let auctions: Auction[] = [];
    if (!query.q || removedSpaces.length < 3 || query.q.length > 50) {
      auctions = [];
    } else {
      auctions = await prisma.auction.findMany({
        where: {
          name: { search: query.q.split(" ").join(" & ") },
          dateEnd: { gt: Date.now().toString() },
          buyerId: null,
        },
        take: 100,
        skip: (page - 1) * 100,
      });
      pages =
        (await prisma.auction.count({
          where: {
            name: { search: query.q.split(" ").join(" & ") },
            dateEnd: { gt: Date.now().toString() },
            buyerId: null,
          },
        })) / 100;
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
            page,
            allPages: pages,
          },
        };
      }
      return {
        props: {
          user: token.user,
          auctions: auctions ? auctions : [],
          page,
          allPages: pages,
        },
      };
    } else {
      return {
        props: { auctions: auctions ? auctions : [], page, allPages: pages },
      };
    }
  }
);

export default function Search(props: SearchProps): JSX.Element {
  // const [user, setUser] = useState<User | undefined>(props.user);
  const router = useRouter();
  const refreshData = () => {
    router.push(router.asPath);
  };
  return (
    <Box>
      <Header user={props.user} refresh={refreshData} />
      {props.auctions.length === 0 ? (
        <Box>Nie znaleziono aukcji.</Box>
      ) : (
        <AuctionsGrid
          auctions={props.auctions}
          allPages={props.allPages}
          page={props.page}
        />
      )}
    </Box>
  );
}
