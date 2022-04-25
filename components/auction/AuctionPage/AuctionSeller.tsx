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
      minH="fit-content"
      overflow="hidden"
      backgroundColor={useColorModeValue("light.primary4", "dark.primary4")}
    >
      {renderSellerAvatar()}
      <Flex
        ml="2"
        flexDirection={{ base: "column", md: "row" }}
        gap={{ md: 1 }}
      >
        <Text>{auction.seller.firstName}</Text>
        <Text>{auction.seller.lastName}</Text>
      </Flex>
    </Button>
  );
}
