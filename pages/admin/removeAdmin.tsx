import { Box, Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { Admin } from "@prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import React from "react";
import NextButton from "../../components/NextButton";
import withAdminSession from "../../libs/admin/adminIronSession";
import checkIfAdminTokenValidAndRefresh from "../../libs/admin/checkIfAdminTokenValidAndRefresh";
import prisma from "../../prisma/prisma";
import AdminHeader from "../../components/AdminHeader";
import { useRouter } from "next/router";

interface RemoveAdminPageProps {
  admins: Admin[];
  admin: Admin;
  token: string;
}
export const getServerSideProps: GetServerSideProps = withAdminSession(
  async function ({ req }: { req: NextApiRequest & { session: Session } }) {
    const token = await checkIfAdminTokenValidAndRefresh(req.session);
    const currentEmail = token ? token.user.email : "";
    const admins = await prisma.admin.findMany({
      where: { email: { notIn: ["keifanel@gmail.com", currentEmail] } },
      select: { email: true, id: true },
    });
    if (token) {
      return { props: { token: token.token, admins, admin: token.user } };
    } else {
      return { props: { token: "" } };
    }
  }
);
export default function RemoveAdminPage(
  props: RemoveAdminPageProps
): JSX.Element {
  const router = useRouter();
  if (!props.admin) router.push("/admin");
  return (
    <Box>
      <AdminHeader admin={props.admin} />
      <Table>
        <Thead>
          <Tr>
            <Td>Id</Td>
            <Td>Nazwa</Td>
            <Td>Usuń</Td>
          </Tr>
        </Thead>
        <Tbody>
          {props.admins?.map((admin) => (
            <Tr key={admin.id}>
              <Td>{admin.id}</Td>
              <Td>{admin.email}</Td>
              <Td>
                <NextButton href={`/api/admin/removeAdmin?id=${admin.id}`}>
                  Usuń
                </NextButton>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
