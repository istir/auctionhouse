import { Auction, Bid, Category, User } from ".prisma/client";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import useLightModeCheck from "../../../libs/hooks/useLightModeCheck";
import AuctionAddToCart from "./AuctionAddToCart";
import AuctionBid from "./AuctionBid";
// import AuctionBuyNow from "./AuctionBuyNow";
import AuctionSeller from "./AuctionSeller";

interface AuctionHeaderProps {
  user?: User;
  setInCart: (boolean: boolean) => void;
  inCart: boolean;
  auction: Auction & {
    category: Category;
    seller: User;
    buyer: User | null;
    bids: Bid[];
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
        <Flex justifyContent="space-between" gridGap="2">
          <AuctionSeller auction={auction} />
          {auction.bidding ? (
            <AuctionBid auction={auction} user={props.user} />
          ) : (
            <AuctionAddToCart
              auction={auction}
              setInCart={props.setInCart}
              inCart={props.inCart}
            />
          )}
        </Flex>
      </Box>
    </Box>
  );
}
