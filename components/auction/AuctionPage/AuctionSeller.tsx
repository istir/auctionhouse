import { Auction, User } from ".prisma/client";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import React from "react";

interface AuctionSellerProps {
  auction: Auction & { seller: User };
}

export default function AuctionSeller({
  auction,
}: AuctionSellerProps): JSX.Element {
  function renderSellerAvatar() {
    // console.log(auction.seller.avatar);
    if (auction.seller.avatar) {
      return (
        <Image
          src={auction.seller.avatar}
          alt={`${auction.seller.firstName} ${auction.seller.lastName}`}
          w={["24px", "32px"]}
          h={["24px", "32px"]}
          objectFit="cover"
          borderRadius="full"
          shadow="md"
        />
      );
    }
  }

  return (
    <Button variant="pill" minH="fit-content">
      {renderSellerAvatar()}
      <Text ml="2">{`${auction.seller.firstName} ${auction.seller.lastName}`}</Text>
    </Button>
  );
}
