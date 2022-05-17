import {
  Box,
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Admin, Auction, Bid, User } from "@prisma/client";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import AdminHeader from "../../components/AdminHeader";
import NextButton from "../../components/NextButton";
import Pagination from "../../components/Pagination";
import TitleHolder from "../../components/TitleHolder";
import withAdminSession from "../../libs/admin/adminIronSession";
import checkIfAdminTokenValidAndRefresh from "../../libs/admin/checkIfAdminTokenValidAndRefresh";
import prisma from "../../prisma/prisma";

interface AdminItemsPageProps {
  admin?: Admin;
  auctions: (Auction & { seller: User; bids: Bid[] })[];
  page: number;
  pages: number;
}

export const getServerSideProps: GetServerSideProps = withAdminSession(
  async function ({
    req,
    query,
  }: {
    req: NextApiRequest & { session: Session };
    query: { p: string };
  }) {
    const token = await checkIfAdminTokenValidAndRefresh(req.session);
    const page = parseInt(query.p) || 1;
    if (token) {
      const pages = (await prisma.auction.count()) / 100;
      const auctions = await prisma.auction.findMany({
        skip: (page - 1) * 100,
        take: 100,
        include: {
          seller: { select: { firstName: true, lastName: true } },
          bids: { select: { offer: true } },
        },
      });
      return {
        props: { admin: token.user, auctions, page, pages: Math.ceil(pages) },
      };
    } else {
      return { props: { admin: "", auctions: [], page: 1, pages: 1 } };
    }
  }
);

export default function AdminItemsPage(
  props: AdminItemsPageProps
): JSX.Element {
  const router = useRouter();
  React.useEffect(() => {
    if (!props.admin) {
      router.push("/admin");
    }
    return () => {
      //cleanup - ComponentWillUnmount
    };
  });
  if (!props.admin) {
    return <Box></Box>;
  }
  return (
    <Box>
      <AdminHeader admin={props.admin} />
      <TitleHolder title="Przedmioty">
        <TableContainer m="2" border={"1px"} borderRadius="md">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Aukcja</Th>
                <Th>Sprzedający</Th>
                <Th>Licytacja</Th>
                <Th>Kup teraz</Th>
                <Th>Zakończona</Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.auctions.map((auction) => (
                <Tr key={auction.id}>
                  <Td maxW={"40"} overflowX="auto" p="1">
                    <NextButton
                      href={`/auction/${auction.url}`}
                      variant="ghost"
                      m="0"
                    >
                      {auction.name}
                    </NextButton>
                  </Td>
                  <Td maxW={"40"} overflowX="auto">
                    {`${auction.seller?.firstName} ${auction.seller?.lastName}`}
                  </Td>
                  <Td maxW={"40"} overflowX="auto">
                    {auction.bidding
                      ? auction.bids && auction.bids.length > 0
                        ? auction.bids[auction.bids.length - 1].offer + " zł"
                        : " "
                      : ""}
                  </Td>
                  <Td maxW={"40"} overflowX="auto">
                    {!auction.bidding ? auction.price + " zł" : ""}
                  </Td>
                  <Td maxW={"40"} overflowX="auto">
                    {auction.buyerId !== null ||
                    parseInt(auction.dateEnd) < Date.now() ? (
                      <Checkbox defaultChecked isDisabled />
                    ) : (
                      <Checkbox isDisabled />
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </TitleHolder>
      <Pagination
        page={props.page}
        // allPages={props.pages}
        allPages={props.pages}
        functionToApply={(page) => {
          return `/admin/items?p=${page}`;
        }}
      />
    </Box>
  );
}
