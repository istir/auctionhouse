import { Auction, User } from "@prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CartComponent from "../components/header/CartComponent";
import Header from "../components/header/header";
import checkIfTokenValidAndRefresh from "../libs/checkIfTokenValidAndRefresh";
// import getItemsInCart from "../libs/getItemsInCart";
// import { get } from "stack-trace";
import withSession from "../libs/ironSession";
import prisma from "../prisma/prisma";
interface CartPageProps {
  user: User;
  auctions: Auction[];
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
          cart: { include: { items: true } },
          id: true,
        },
      });
      return {
        props: {
          user: user,
          auctions: user?.cart?.items || [],
        },
      };
    } else {
      return { props: { auctions: [] } };
    }
  }
);

export default function CartPage(props: CartPageProps): JSX.Element {
  const [user, setUser] = useState<User | undefined>(props.user);

  const router = useRouter();
  return (
    <>
      <Header
        user={props.user}
        // setUser={setUser}
        refresh={() => {
          router.push(router.asPath);
        }}
      />
      <CartComponent
        cartItems={props.auctions}

        // setUser=
        // refresh={() => {
        //   router.push(router.asPath);
        // }}
      />
    </>
  );
}
