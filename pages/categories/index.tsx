import { Box, VStack } from "@chakra-ui/react";
import { Category, Token, User } from "@prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/header/header";
import checkIfTokenValidAndRefresh from "../../libs/checkIfTokenValidAndRefresh";
import withSession from "../../libs/ironSession";
import prisma from "../../prisma/prisma";

// import NextLink from "next/link";

interface CategoriesProps {
  user?: User;
  categories: Category[];
  token: Token;
}

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({ req }: { req: NextApiRequest & { session: Session } }) {
    // return await getUserFromSession(req);

    //   const auctions = await prisma.auction.findMany();
    const categories = await prisma.category.findMany();
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
            categories: categories || [],
          },
        };
      }
      return {
        props: {
          token: token.token,
          user: token.user,
          categories: categories || [],
        },
      };
    } else {
      return { props: { token: "", categories: categories || [] } };
    }
  }
);

export default function Categories(props: CategoriesProps): JSX.Element {
  const router = useRouter();
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

      <VStack>
        {props.categories.map((category) => (
          // <NextLink>{category.name}</NextLink>
          <Box key={category.id}>{category.name}</Box>
        ))}
      </VStack>
    </Box>
  );
}
