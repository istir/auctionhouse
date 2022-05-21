import { Box, useColorModeValue } from "@chakra-ui/react";
import { Category, CategoryParent, User } from "@prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/header/header";
import Categories from "../../components/mainPage/Categories";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import getCategories from "../../libs/getCategories";
import withSession from "../../libs/ironSession";
import prisma from "../../prisma/prisma";

interface CategoriesPageProps {
  user?: User;
  parentCategories: (CategoryParent & {
    categories: Category[];
  })[];
}

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({ req }: { req: NextApiRequest & { session: Session } }) {
    const parentCategories = await getCategories();
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
            parentCategories: parentCategories || [],
          },
        };
      }
      return {
        props: {
          user: token.user,
          parentCategories: parentCategories || [],
        },
      };
    } else {
      return { props: { parentCategories: parentCategories || [] } };
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
