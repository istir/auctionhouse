import { User } from "@prisma/client";
// import { trace } from "console";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import React from "react";
import AddAuction from "../components/auction/AddAuction";
import checkIfTokenValidAndRefresh from "../libs/checkIfTokenValidAndRefresh";
// import getItemsInCart from "../libs/getItemsInCart";
// import { get } from "stack-trace";
import withSession from "../libs/ironSession";
import prisma from "../prisma/prisma";
interface AddAuctionPageProps {
  user: User;
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

          id: true,
        },
      });
      return {
        props: {
          user: user,
        },
      };
    }
  }
);

export default function AddAuctionPage(
  props: AddAuctionPageProps
): JSX.Element {
  // const [user, setUser] = useState<User | undefined>(props.user);
  return <AddAuction user={props.user} />;
}
