import { Box } from "@chakra-ui/react";
import { Auction, Bid, User } from "@prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import AuctionsGrid from "../../components/auction/AuctionsGrid";
import Header from "../../components/header/header";
import TitleHolder from "../../components/TitleHolder";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import withSession from "../../libs/ironSession";
import { printDevStackTrace } from "../../libs/stackTrace";
import prisma from "../../prisma/prisma";

interface CategoriesByNameProps {
  user?: User;
  auctions: (Auction & { bids: Bid[] })[];
  categoryName: string;
  page: number;
  allPages: number;
}
export const getServerSideProps: GetServerSideProps = withSession(
  async function ({
    req,
    params,
    query,
  }: {
    req: NextApiRequest & { session: Session };
    params: { url: string };
    query: { q: string; p: string };
  }) {
    const page = parseInt(query.p) || 1;

    printDevStackTrace(`Query: ${query.q}`);
    const removedSpaces = query.q && query.q.replace(/ /g, "");
    let pages = 0;
    let auctions: Auction[] = [];
    if (!query.q || removedSpaces.length < 3 || query.q.length > 50) {
      pages =
        (await prisma.auction.count({
          where: {
            category: { url: params.url },
            buyerId: null,
            dateEnd: { gt: Date.now().toString() },
          },
        })) / 100;
      auctions = await prisma.auction.findMany({
        where: {
          category: { url: params.url },
          buyerId: null,
          dateEnd: { gt: Date.now().toString() },
        },
        include: { bids: true },
        take: 100,
        skip: (page - 1) * 100,
      });
    } else {
      pages =
        (await prisma.auction.count({
          where: {
            AND: [
              {
                category: {
                  url: params.url,
                },
              },
              { buyerId: null },
              { name: { search: query.q.split(" ").join(" & ") } },
              { dateEnd: { gt: Date.now().toString() } },
            ],
          },
        })) / 100;
      auctions = await prisma.auction.findMany({
        where: {
          AND: [
            {
              category: {
                url: params.url,
              },
            },
            { buyerId: null },
            { name: { search: query.q.split(" ").join(" & ") } },
            { dateEnd: { gt: Date.now().toString() } },
          ],
        },
        take: 100,
        skip: (page - 1) * 100,
        include: { bids: true },
      });
    }
    const category = await prisma.category.findFirst({
      where: { url: params.url },
      select: { name: true },
    });
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
          cart: { include: { items: { where: { buyerId: null } } } },
          id: true,
        },
      });
      if (user) {
        return {
          props: {
            user: user,
            auctions: auctions ? auctions : [],
            categoryName: category ? category.name : "",
            page,
            allPages: pages,
          },
        };
      }
      return {
        props: {
          user: token.user,
          auctions: auctions ? auctions : [],
          categoryName: category ? category.name : "",
          page,
          allPages: pages,
        },
      };
    } else {
      return {
        props: {
          auctions: auctions ? auctions : [],
          categoryName: category ? category.name : "",
          page,
          allPages: pages,
        },
      };
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
      <TitleHolder title={props.categoryName} router={router}>
        <AuctionsGrid
          auctions={props.auctions}
          allPages={props.allPages}
          page={props.page}
        />
      </TitleHolder>
      {props.auctions.length === 0 && (
        <Box mx="2" fontSize={"lg"}>
          Nie znaleziono aukcji.
        </Box>
      )}
    </Box>
  );
}
