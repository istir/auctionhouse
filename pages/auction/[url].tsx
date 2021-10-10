import { Auction, Category, User } from ".prisma/client";
import { Box } from "@chakra-ui/react";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import AuctionCom from "../../components/auction/AuctionPage/AuctionCom";
import prisma from "../../prisma/prisma";
interface AuctionPageProps {
  auction: Auction & {
    category: Category;
    seller: User;
    buyer: User | null;
  };
}

export async function getStaticPaths() {
  const auctions = await prisma.auction.findMany({
    where: { url: { not: null } },
  });
  const paths = auctions.map((a) => ({
    params: { url: a.url },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(context: { params: { url: string } }) {
  //   console.log(context.params);
  let auction = await prisma.auction.findUnique({
    where: { url: context.params.url },
    include: {
      category: true,
      seller: { select: { firstName: true, lastName: true, avatar: true } },
      buyer: { select: { firstName: true, lastName: true, avatar: true } },
    },
    // select:{name:true,category:true,seller:{select:{firstName:true,}}}
  });
  return { props: { auction } };
}

export default function AuctionPage(props: AuctionPageProps): JSX.Element {
  //   const router = useRouter();
  //   const { url } = router.query;
  console.log(props.auction);
  return <AuctionCom auction={props.auction} />;
}
