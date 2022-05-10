import { Auction, Bid, Cart, Category, Token, User } from ".prisma/client";
import { Box } from "@chakra-ui/react";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import AddAuction from "../../../components/auction/AddAuction";
import Header from "../../../components/header/header";
import checkIfTokenValidAndRefresh from "../../../libs/checkIfTokenValidAndRefresh";
import withSession from "../../../libs/ironSession";
import prisma from "../../../prisma/prisma";

interface AuctionModifyPageProps {
  token?: Token & {
    user: User & {
      cart: Cart & {
        items: Auction[];
      };
    };
  };
  user?: User & {
    cart: Cart & {
      items: Auction[];
    };
  };

  auction?: Auction & {
    category: Category;
    seller: User;
    buyer: User | null;
    bids: Bid[];
  };
}
// test
// export async function getStaticPaths() {
//   const auctions = await prisma.auction.findMany({
//     where: { url: { not: null } },
//   });
//   const paths = auctions.map((a) => ({
//     params: { url: a.url },
//   }));
//   return { paths, fallback: false };
// }

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({
    req,
    params,
  }: {
    req: NextApiRequest & { session: Session };
    params: { url: string };
  }) {
    const token = await checkIfTokenValidAndRefresh(req.session);
    if (!token) return { props: {} };
    const auction = await prisma.auction.findFirst({
      where: {
        AND: [
          { url: params.url },
          { sellerId: token.user.id },
          { buyerId: null },
        ],
      },
      include: {
        category: true,
        seller: { select: { firstName: true, lastName: true, avatar: true } },
        buyer: { select: { firstName: true, lastName: true, avatar: true } },
        bids: { select: { userId: true, offer: true } },
      },
    });
    // console.log(auction);

    if (token) {
      const user = await prisma.user.findUnique({
        where: { id: token.user.id },
        select: {
          avatar: true,
          firstName: true,
          lastName: true,
          cart: { include: { items: { where: { buyerId: null } } } },
          id: true,
        },
      });
      return { props: { auction, user } };
    }
    return { props: { auction, token } };
  }
);

export default function AuctionModifyPage(
  props: AuctionModifyPageProps
): JSX.Element {
  const router = useRouter();
  console.log(props.token?.user);

  if (!props.auction)
    return (
      <Box>
        <Header user={props.user} refresh={router.reload} />
        404
      </Box>
    );
  if (props.user) {
    return (
      <Box>
        <Header user={props.user} refresh={router.reload} />
        <AddAuction user={props.user} modify={props.auction} />
      </Box>
    );
  }
  return <Box>Nie zalogowano</Box>;
}
