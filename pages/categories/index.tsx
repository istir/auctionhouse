import { Box, useColorModeValue } from "@chakra-ui/react";
import { Category, CategoryParent, Token, User } from "@prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/header/header";
import Categories from "../../components/mainPage/categories/Categories";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import withSession from "../../libs/ironSession";
import prisma from "../../prisma/prisma";

interface CategoriesPageProps {
  user?: User;
  parentCategories: (CategoryParent & {
    categories: Category[];
  })[];
  token: Token;
}

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({ req }: { req: NextApiRequest & { session: Session } }) {
    // return await getUserFromSession(req);

    //   const auctions = await prisma.auction.findMany();
    const parentCategories = await prisma.categoryParent.findMany({
      include: {
        categories: { include: { auctions: { select: { _count: true } } } },
      },
    });
    // const categories = await prisma.category.findMany();
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
            parentCategories: parentCategories || [],
          },
        };
      }
      return {
        props: {
          token: token.token,
          user: token.user,
          parentCategories: parentCategories || [],
        },
      };
    } else {
      return { props: { token: "", parentCategories: parentCategories || [] } };
    }
  }
);

export default function CategoriesPage(
  props: CategoriesPageProps
): JSX.Element {
  const router = useRouter();
  const colors = useColorModeValue("light.primary1", "dark.primary1");
  const buttonColors = useColorModeValue("light.primary4", "dark.primary4");

  const refreshData = () => {
    router.push(router.asPath);
  };
  return (
    <Box>
      <Header user={props.user} refresh={refreshData} />

      <Categories parentCategories={props.parentCategories} />
    </Box>
  );
}
