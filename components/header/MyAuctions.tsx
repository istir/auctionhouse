import {
  Box,
  Checkbox,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Auction, Bid, User } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import AuctionTimer from "../auction/AuctionTimer";
import NextButton from "../NextButton";
import TitleHolder from "../TitleHolder";
import Header from "./header";

interface MyAuctionsProps {
  auctionsWon?: Auction[];
  auctionsBid?: (Auction & { bids: Bid[] })[];
  token?: string;
  user?: User;
  sellingAuctions?: (Auction & { bids: Bid[] })[];
  //   bids?: Bid[] & { auction: Auction };
  refresh: () => void;
}

export default function MyAuctions(props: MyAuctionsProps): JSX.Element {
  console.log(props.auctionsWon);
  console.log(props.auctionsBid);
  const router = useRouter();
  return (
    <Box>
      <Header user={props.user} />
      <TitleHolder title="Licytowane przedmioty">
        <TableContainer m="2" border={"1px"} borderRadius="md">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Aukcja</Th>
                <Th>Do końca</Th>
                <Th>Oferta</Th>
                <Th>Kupiona</Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.auctionsBid?.map((auction) => (
                <Tr
                  key={auction.id}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push("/auction/" + auction.url);
                  }}
                >
                  <Td>
                    <Box>{auction.name}</Box>
                    {auction.image.length > 0 && (
                      <Image
                        maxW={"32"}
                        src={auction.image[0]}
                        alt={auction.name}
                      />
                    )}
                  </Td>
                  <Td>
                    <AuctionTimer dateToEnd={auction.dateEnd} />
                  </Td>
                  <Td>
                    {auction.bids.length > 0
                      ? auction.bids[auction.bids.length - 1].offer
                      : " "}{" "}
                    zł
                  </Td>
                  <Td>
                    {auction.buyerId === props.user?.id ? (
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
      <TitleHolder title="Kupione przedmioty">
        <TableContainer m="2" border={"1px"} borderRadius="md">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Aukcja</Th>

                <Th>Oferta</Th>
                <Th>Kupiona</Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.auctionsWon?.map((auction) => (
                <Tr
                  key={auction.id}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push("/auction/" + auction.url);
                  }}
                >
                  <Td>
                    <Box>{auction.name}</Box>
                    {auction.image.length > 0 && (
                      <Image
                        maxW={"32"}
                        src={auction.image[0]}
                        alt={auction.name}
                      />
                    )}
                  </Td>

                  <Td>{auction.price} zł</Td>
                  <Td>
                    {auction.buyerId === props.user?.id ? (
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
      <TitleHolder title="Sprzedawane przedmioty">
        <TableContainer m="2" border={"1px"} borderRadius="md">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Aukcja</Th>

                <Th>Oferta</Th>
                <Th>Zakończona</Th>
                <Th>Kupiona</Th>
                <Th>Edytuj</Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.sellingAuctions?.map((auction) => (
                <Tr
                  key={auction.id}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push("/auction/" + auction.url);
                  }}
                >
                  <Td>
                    <Box>{auction.name}</Box>
                    {auction.image.length > 0 && (
                      <Image
                        maxW={"32"}
                        src={auction.image[0]}
                        alt={auction.name}
                      />
                    )}
                  </Td>

                  <Td>{auction.price} zł</Td>
                  <Td>
                    {auction.buyerId !== null ||
                    parseInt(auction.dateEnd) < Date.now() ? (
                      <Checkbox defaultChecked isDisabled />
                    ) : (
                      <Checkbox isDisabled />
                    )}
                  </Td>
                  <Td>
                    {auction.buyerId !== null ? (
                      <Checkbox defaultChecked isDisabled />
                    ) : (
                      <Checkbox isDisabled />
                    )}
                  </Td>
                  <Td
                    cursor={"default"}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <NextButton
                      href={`/auction/modify/${auction.url}`}
                      disabled={auction.buyerId !== null}
                    >
                      Edytuj
                    </NextButton>
                    {/* {auction.buyerId !== null ? (
                      <Checkbox defaultChecked isDisabled />
                    ) : (
                      <Checkbox isDisabled />
                    )} */}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </TitleHolder>
    </Box>
  );
}
