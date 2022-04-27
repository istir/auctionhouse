import { Box } from "@chakra-ui/react";
import { Admin } from "@prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import React from "react";
import NextButton from "../../components/NextButton";
import withAdminSession from "../../libs/admin/adminIronSession";
import checkIfAdminTokenValidAndRefresh from "../../libs/admin/checkIfAdminTokenValidAndRefresh";
import AdminHeader from "../../components/AdminHeader";

interface AdminIndexPageProps {
  token: string;
  admin?: Admin;
}

export const getServerSideProps: GetServerSideProps = withAdminSession(
  async function ({ req }: { req: NextApiRequest & { session: Session } }) {
    // return await getUserFromSession(req);
    // const auctions = await prisma.auction.findMany({
    //   where: { dateEnd: "" },
    //   take: 100,
    //   include: { bids: true },
    // });
    // const auctions = (await getRandomAuctions(100, 100)) || [];
    // console.log(auctions);
    const token = await checkIfAdminTokenValidAndRefresh(req.session);
    console.log(token);
    if (token) {
      return { props: { token: token.token, admin: token.user } };
    } else {
      return { props: { token: "", admin: "" } };
    }
    // if (token) {
    //   const user = await prisma.user.findUnique({
    //     where: { id: token.user.id },
    //     select: {
    //       avatar: true,
    //       firstName: true,
    //       lastName: true,
    //       cart: { include: { items: true } },
    //       id: true,
    //     },
    //   });
    //   if (user) {
    //     return {
    //       props: {
    //         token: token.token,
    //         user: user,
    //         auctions: auctions ? auctions : [],
    //       },
    //     };
    //   }
    //   return {
    //     props: {
    //       token: token.token,
    //       user: token.user,
    //       auctions: auctions ? auctions : [],
    //     },
    //   };
    // } else {
    //   return { props: { token: "", auctions: auctions ? auctions : [] } };
    // }
  }
);
export default function AdminIndexPage(
  props: AdminIndexPageProps
): JSX.Element {
  if (!props.token || !props.admin)
    return (
      <Box>
        Nie jesteś zalogowany{" "}
        <NextButton href="/admin/login">Zaloguj</NextButton>
      </Box>
    );
  return <AdminHeader admin={props.admin} />;
}
