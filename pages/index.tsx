import { Bid, Category, CategoryParent, User } from ".prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import Header from "../components/header/header";
import checkIfTokenValidAndRefresh from "../libs/checkIfTokenValidAndRefresh";
import withSession from "../libs/ironSession";
import { useRouter } from "next/router";
import prisma from "../prisma/prisma";
import { Auction } from "@prisma/client";
import { Box } from "@chakra-ui/layout";
import getRandomAuctions from "../libs/getRandomAuctionsLib";
import { useState } from "react";
import AuctionsGrid from "../components/auction/AuctionsGrid";
import Categories from "../components/mainPage/Categories";
import getCategories from "../libs/getCategories";
import { getAllPages } from "../libs/pagination";

interface HomePageProps {
  parentCategories: (CategoryParent & {
    categories: Category[];
  })[];
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
    query: { p: string };
  }) {
    const page = parseInt(query.p) || 1;

    const parentCategories = await getCategories();
    const pages = await getAllPages();

    const auctions = (await getRandomAuctions(100, (page - 1) * 100)) || [];
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
            parentCategories: parentCategories || [],
            page: page,
            allPages: pages,
          },
        };
      }
      return {
        props: {
          parentCategories: parentCategories || [],
          user: token.user,
          auctions: auctions ? auctions : [],
          page: page,
          allPages: pages,
        },
      };
    } else {
      return {
        props: {
          auctions: auctions ? auctions : [],
          parentCategories: parentCategories || [],
          page: page,
          allPages: pages,
        },
      };
    }
  }
);

export default function Home(props: HomePageProps) {
  const [user, setUser] = useState<User | undefined>(props.user);

  const router = useRouter();
  const refreshData = () => {
    router.push(router.asPath);
  };

  return (
    <Box>
      <Header user={user} setUser={setUser} refresh={refreshData} />

      <Categories
        dontRenderHeader
        gridDirection="column"
        flexDirection={{ base: "column", md: "column" }}
        parentCategories={props.parentCategories}
        collapsable
      />

      <AuctionsGrid
        auctions={props.auctions}
        page={props.page}
        allPages={props.allPages}
      />
    </Box>
  );
}
