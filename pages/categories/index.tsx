import { Box, Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react";
import { Category, CategoryParent, Token, User } from "@prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/header/header";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import withSession from "../../libs/ironSession";
import prisma from "../../prisma/prisma";

import NextButton from "../../components/NextButton";

interface CategoriesProps {
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

export default function Categories(props: CategoriesProps): JSX.Element {
  const router = useRouter();
  const colors = useColorModeValue("light.primary1", "dark.primary1");
  const buttonColors = useColorModeValue("light.primary4", "dark.primary4");

  const refreshData = () => {
    router.push(router.asPath);
  };
  return (
    <Box>
      <Header
        user={props.user}
        refresh={refreshData}
        token={props.token.token}
      />

      <Grid pb="5" gap={{ base: "3", md: "6" }} m="3">
        <Text fontSize={{ base: "2xl", md: "3xl" }} mb={{ base: "2", md: "6" }}>
          Wszystkie kategorie
        </Text>
        {props.parentCategories?.map(
          (parentCategory) =>
            parentCategory?.categories?.length > 0 && (
              <Box
                key={parentCategory.id}
                backgroundColor={colors}
                padding={4}
                borderRadius="lg"
                boxShadow={"lg"}
              >
                <Text fontSize={{ base: "xl", md: "2xl" }} mb="2">
                  {parentCategory.name}
                </Text>
                <Flex flexDirection={{ base: "column", md: "row" }} gap="2">
                  {parentCategory.categories?.map((category) => (
                    <NextButton
                      key={category.id}
                      href={`/categories/${category.url || "#"}`}
                      borderRadius={"lg"}
                      boxShadow="sm"
                      backgroundColor={buttonColors}
                    >
                      <Text>{category.name}</Text>
                    </NextButton>
                  ))}
                </Flex>
              </Box>
            )
        )}
      </Grid>
    </Box>
  );
}
