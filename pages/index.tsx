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

interface HomePageProps {
  parentCategories: (CategoryParent & {
    categories: Category[];
  })[];
  user?: User;
  auctions: (Auction & { bids: Bid[] })[];
}

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({ req }: { req: NextApiRequest & { session: Session } }) {
    const parentCategories = await prisma.categoryParent.findMany({
      include: {
        categories: { include: { auctions: { select: { _count: true } } } },
      },
    });

    const auctions = (await getRandomAuctions(100, 100)) || [];
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
            parentCategories: parentCategories || [],
          },
        };
      }
      return {
        props: {
          parentCategories: parentCategories || [],
          user: token.user,
          auctions: auctions ? auctions : [],
        },
      };
    } else {
      return {
        props: {
          auctions: auctions ? auctions : [],
          parentCategories: parentCategories || [],
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

      <AuctionsGrid auctions={props.auctions} />
    </Box>
  );
}
