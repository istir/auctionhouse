import { Auction } from ".prisma/client";
import { Button } from "@chakra-ui/button";
import { Flex, Grid, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import useLightModeCheck from "../../../libs/hooks/useLightModeCheck";
import AuctionBuyModal from "../AuctionBuyWindow.tsx/AuctionBuyModal";

interface AuctionAddToCartProps {
  auction: Auction;
  size?: "md" | "lg";
  full?: boolean;
}

export default function AuctionAddToCart({
  auction,
  ...props
}: AuctionAddToCartProps): JSX.Element {
  const lightMode = useLightModeCheck();
  function sendAjaxRequest() {
    console.log("ZAAAMN");
    axios({
      method: "POST",
      url: "/api/addItemToCart",
      data: { auctionId: auction.id },
    });
  }
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
    <AuctionBuyModal auction={auction} onPress={sendAjaxRequest}>
      <Button
        variant="pill"
        // @ts-ignore
        promo={
          auction.originalPrice &&
          (auction.originalPrice > auction.price).toString()
        }
        size={props.size}
        width={props.full ? "full" : "fit-content"}
        overflow="hidden"

        // style={{ WebkitTapHighlightColor: "transparent" }}
        // css={{ WebkitTapHighlightColor: "transparent" }}
        // __css={{ WebkitTapHighlightColor: "transparent" }}
      >
        <Flex alignItems="center">
          <Text>Dodaj do koszyka |</Text> {renderPrice()}
        </Flex>
      </Button>
    </AuctionBuyModal>
  );
}
