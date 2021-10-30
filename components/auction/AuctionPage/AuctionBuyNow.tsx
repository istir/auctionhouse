import { Auction } from ".prisma/client";
import { Button } from "@chakra-ui/button";
import { Grid, Flex, Text } from "@chakra-ui/react";
import React from "react";
import useLightModeCheck from "../../../libs/hooks/useLightModeCheck";

interface AuctionBuyNowProps {
  auction: Auction;
  size?: "md" | "lg";
  full?: boolean;
}

export default function AuctionBuyNow({
  auction,
  ...props
}: AuctionBuyNowProps): JSX.Element {
  const lightMode = useLightModeCheck();

  function renderPrice() {
    if (auction.originalPrice && auction.originalPrice > auction.price) {
      return (
        <Grid ml="1" templateRows="auto auto">
          <Text fontSize="x-small" textDecoration="line-through">
            {auction.originalPrice} zł
          </Text>
          <Text color={lightMode ? "red.600" : "red.400"}>
            {auction.price} zł
          </Text>
        </Grid>
      );
    } else {
      return <Text ml="1">{auction.price} zł</Text>;
    }
  }

  return (
    <Button
      variant="pill"
      promo={
        auction.originalPrice &&
        (auction.originalPrice > auction.price).toString()
      }
      size={props.size}
      width={props.full ? "full" : "fit-content"}

      // style={{ WebkitTapHighlightColor: "transparent" }}
      // css={{ WebkitTapHighlightColor: "transparent" }}
      // __css={{ WebkitTapHighlightColor: "transparent" }}
    >
      <Flex alignItems="center">
        <Text>Kup Teraz |</Text> {renderPrice()}
      </Flex>
    </Button>
  );
}
