import { Auction, Bid, User } from "@prisma/client";
// import { trace } from "console";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import MyAuctions from "../components/header/MyAuctions";
import checkIfTokenValidAndRefresh from "../libs/checkIfTokenValidAndRefresh";
// import getItemsInCart from "../libs/getItemsInCart";
// import { get } from "stack-trace";
import withSession from "../libs/ironSession";
import prisma from "../prisma/prisma";
interface MyAuctionsPageProps {
  user: User;
  bought: Auction[];
  //   bids: Bid[] & {
  //     auction: Auction;
  //   };
  bidding: (Auction & { bids: Bid[] })[];
}

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({ req }: { req: NextApiRequest & { session: Session } }) {
    // const itemsInCart = await getItemsInCart(req.session);
    const token = await checkIfTokenValidAndRefresh(req.session);

    if (token) {
      const user = await prisma.user.findUnique({
        where: { id: token.user.id },
        select: {
          avatar: true,
          firstName: true,
          lastName: true,
          //   bids: { include: { auction: true } },
          auctionsAsBuyer: true,
          id: true,
        },
      });

      const auctions = user
        ? await prisma.auction.findMany({
            where: { buyerId: null, bids: { some: { userId: user.id } } },
            include: { bids: { select: { offer: true } } },
          })
        : [];

      //   const auctions = []
      //   user?.bids.forEach(bid => {
      //       const a = bid.auction
      //       a.price=bid.offer
      //       auctions.push(bid.auction)
      //   });
      return {
        props: {
          user: user,
          bought: user?.auctionsAsBuyer || [],
          //   bids: user?.bids || [],
          bidding: auctions,
        },
      };
    } else {
      return { props: { auctions: [] } };
    }
  }
);

export default function MyAuctionsPage(
  props: MyAuctionsPageProps
): JSX.Element {
  const router = useRouter();
  return (
    <MyAuctions
      auctionsWon={props.bought}
      user={props.user}
      //   bids={props.bids}
      auctionsBid={props.bidding}
      refresh={() => {
        router.push(router.asPath);
      }}
    />
  );
}
