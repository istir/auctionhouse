import { Auction, Bid, Category, User } from ".prisma/client";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useBreakpoint, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import PopupLogin from "../../login/PopupLogin";
import NextButton from "../../NextButton";
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
        <NextButton
          href={`/categories/${auction.category.url}`}
          borderRadius="full"
          variant="pill"
          backgroundColor={useColorModeValue("gray.100", "gray.800")}
          // colorScheme={"gray"}
        >
          <Text>{auction.category.name}</Text>
        </NextButton>

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
