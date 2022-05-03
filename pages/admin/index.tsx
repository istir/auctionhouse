import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
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
    const token = await checkIfAdminTokenValidAndRefresh(req.session);
    console.log(token);
    if (token) {
      return { props: { token: token.token, admin: token.user } };
    } else {
      return { props: { token: "", admin: "" } };
    }
  }
);
export default function AdminIndexPage(
  props: AdminIndexPageProps
): JSX.Element {
  return (
    <Box>
      <Flex
        flexDir={"column"}
        placeItems="center"
        placeContent={"center"}
        margin={{ base: 0, md: 6 }}
        padding="2"
        borderRadius={{ base: "none", md: "md" }}
        backgroundColor={useColorModeValue("light.primary1", "dark.primary1")}
        boxShadow="md"
        minH={"64"}
      >
        <Text fontSize={"2xl"} fontWeight="bold" textAlign={"center"}>
          Panel administracyjny Auctionhouse
        </Text>
        {!props.token || !props.admin ? (
          <Flex flexDir={"column"}>
            <Text>Nie jesteś zalogowany</Text>
            <NextButton href="/admin/login">Zaloguj</NextButton>
          </Flex>
        ) : (
          <AdminHeader
            admin={props.admin}
            dontRenderBG
            justifyContent="center"
          />
        )}
      </Flex>
    </Box>
  );
}
