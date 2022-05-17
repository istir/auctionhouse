import { Auction, Bid, Category, User } from ".prisma/client";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useBreakpoint } from "@chakra-ui/react";
import React from "react";
import PopupLogin from "../../login/PopupLogin";
import AuctionAddToCart from "./AuctionAddToCart";
import AuctionBid from "./AuctionBid";
import AuctionSeller from "./AuctionSeller";

interface AuctionHeaderProps {
  user?: User;
  setInCart: (_boolean: boolean) => void;
  inCart: boolean;
  refresh?: () => void;

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
  const breakpoint = useBreakpoint();

  return (
    <Box>
      <Box pos="relative">
        <Text>{auction.category.name}</Text>
        <Text
          mt={`${imageRef.current?.height}px`}
          fontWeight="bold"
          fontSize="lg"
        >
          {auction.name}
        </Text>
        <Flex
          justifyContent="space-between"
          gridGap="2"
          flexDirection={{ base: "column", md: "row" }}
        >
          <AuctionSeller auction={auction} />
          {auction.bidding ? (
            <AuctionBid auction={auction} user={props.user} />
          ) : props.user ? (
            <AuctionAddToCart
              full={breakpoint === "base" || false}
              auction={auction}
              setInCart={props.setInCart}
              inCart={props.inCart}
              // user={props.user}
            />
          ) : (
            <PopupLogin
              refresh={props.refresh}
              text="Zaloguj się i dodaj do koszyka!"
            />
          )}
        </Flex>
      </Box>
    </Box>
  );
}
