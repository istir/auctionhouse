import { Auction, User } from ".prisma/client";
import { Button } from "@chakra-ui/button";

import { Flex, Text } from "@chakra-ui/layout";
import { Avatar, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface AuctionSellerProps {
  auction: Auction & { seller: User };
}

export default function AuctionSeller({
  auction,
}: AuctionSellerProps): JSX.Element {
  function renderSellerAvatar() {
    // console.log(auction.seller.avatar);
    // if (auction.seller.avatar) {
    return (
      <Avatar
        src={auction.seller.avatar || undefined}
        // alt={`${auction.seller.firstName} ${auction.seller.lastName}`}
        w={["24px", "32px"]}
        h={["24px", "32px"]}
        objectFit="cover"
        borderRadius="full"
        shadow="md"
      />
    );
    // }
  }

  return (
    <Button
      variant="pill"
      height={"100%"}
      minH="max-content"
      overflow="hidden"
      backgroundColor={useColorModeValue("light.primary4", "dark.primary4")}
    >
      <Flex alignItems="center" justifyContent={"center"}>
        {renderSellerAvatar()}
        <Flex
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          mb="1"
        >
          <Text
            fontSize={"sm"}
            fontWeight="normal"
            color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
          >
            Sprzedawca
          </Text>
          <Flex alignItems="center" justifyContent={"center"}>
            <Flex
              ml="2"
              // flexDirection={{ base: "column", md: "row" }}
              gap={1}
            >
              <Text>{auction.seller.firstName}</Text>
              <Text>{auction.seller.lastName}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Button>
  );
}
