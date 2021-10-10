import { Auction, Category, User } from ".prisma/client";
import { Box, Text } from "@chakra-ui/layout";
import { Button, Image } from "@chakra-ui/react";
import React from "react";

interface AuctionHeaderProps {
  auction: Auction & {
    category: Category;
    seller: User;
    buyer: User | null;
  };
}

export default function AuctionHeader({
  auction,
  ...props
}: AuctionHeaderProps): JSX.Element {
  const imageRef = React.useRef<HTMLImageElement>(null);

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
  // console.log(imageRef.current?.height);
  return (
    <Box>
      {/* <Image
        ref={imageRef}
        src={auction.image}
        borderRadius="2xl"
        shadow="lg"
        alt={auction.name}
        pos="fixed"
        top="0"
        // w={`calc(100% - 2 * var(--chakra-space-${["0", "10", "20"]}))`}
        w={[
          "calc(100% - 2 * var(--chakra-space-0))",
          "calc(100% - 2 * var(--chakra-space-10))",
          "calc(100% - 2 * var(--chakra-space-20))",
        ]}
      /> */}
      <Box zIndex="1" pos="relative">
        <Text
          mt={`${imageRef.current?.height}px`}
          fontWeight="bold"
          fontSize="lg"
          // mt="5"
        >
          {auction.name}
        </Text>
        <Button variant="pill" minH="fit-content">
          {renderSellerAvatar()}
          <Text ml="2">{`${auction.seller.firstName} ${auction.seller.lastName}`}</Text>
        </Button>
      </Box>
    </Box>
  );
}
