import { Auction, Bid, Cart, Category, Token, User } from ".prisma/client";
import { Box } from "@chakra-ui/react";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import AuctionCom from "../../components/auction/AuctionPage/AuctionCom";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import withSession from "../../libs/ironSession";
import prisma from "../../prisma/prisma";
interface AuctionPageProps {
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
    // let auction = await prisma.auction.findUnique({
    //   where: { url: params.url },
    //   include: {
    //     category: true,
    //     seller: { select: { firstName: true, lastName: true, avatar: true } },
    //     buyer: { select: { firstName: true, lastName: true, avatar: true } },
    //   },
    // });
    const token = await checkIfTokenValidAndRefresh(req.session);
    const auction = await prisma.auction.findUnique({
      where: { url: params.url },
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
          cart: { include: { items: true } },
          id: true,
        },
      });
      return { props: { auction, user } };
    }
    return { props: { auction, token } };
  }
);

// export async function getStaticProps(context: { params: { url: string } }) {
//   //   console.log(context.params);
//   let auction = await prisma.auction.findUnique({
//     where: { url: context.params.url },
//     include: {
//       category: true,
//       seller: { select: { firstName: true, lastName: true, avatar: true } },
//       buyer: { select: { firstName: true, lastName: true, avatar: true } },
//     },
//     // select:{name:true,category:true,seller:{select:{firstName:true,}}}
//   });

//   return { props: { auction } };
// }

export default function AuctionPage(props: AuctionPageProps): JSX.Element {
  const router = useRouter();
  console.log(props.token?.user);

  if (!props.auction) return <Box>404</Box>;
  return (
    <AuctionCom
      auction={props.auction}
      user={props.token?.user || props.user}
      refresh={() => {
        router.push(router.asPath);
      }}
    />
  );
}
