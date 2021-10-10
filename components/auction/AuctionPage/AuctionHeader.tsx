import { Auction, Category, User } from ".prisma/client";
import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import { Button, Image } from "@chakra-ui/react";
import React from "react";
import useLightModeCheck from "../../../libs/hooks/useLightModeCheck";
import AuctionBuyNow from "./AuctionBuyNow";
import AuctionSeller from "./AuctionSeller";

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
  const lightMode = useLightModeCheck();

  // console.log(imageRef.current?.height);

  //TODO: Kategoria1 -> Kategoria2 -> KATEGORIA3 jako linki
  //TODO: Na desktopie poprawiony header
  //TODO: na mobilce hamburger menu
  return (
    <Box>
      <Box pos="relative">
        <Text>{auction.category.name}</Text>
        <Text
          mt={`${imageRef.current?.height}px`}
          fontWeight="bold"
          fontSize="lg"
          // mt="5"
        >
          {auction.name}
        </Text>
        <Flex justifyContent="space-between">
          <AuctionSeller auction={auction} />
          <AuctionBuyNow auction={auction} />
        </Flex>
      </Box>
    </Box>
  );
}
