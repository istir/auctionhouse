import { Auction } from "@prisma/client";
// import { trace } from "console";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import React from "react";
import CartComponent from "../components/header/Cart";
import getItemsInCart from "../libs/getItemsInCart";
// import { get } from "stack-trace";
import withSession from "../libs/ironSession";
interface CartPageProps {
  auctions: Auction[];
}

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({ req }: { req: NextApiRequest & { session: Session } }) {
    const itemsInCart = await getItemsInCart(req.session);

    if (itemsInCart) {
      return {
        props: {
          auctions: itemsInCart,
        },
      };
    } else {
      return { props: { auctions: [] } };
    }
  }
);

export default function CartPage(props: CartPageProps): JSX.Element {
  return <CartComponent cartItems={props.auctions} />;
}
