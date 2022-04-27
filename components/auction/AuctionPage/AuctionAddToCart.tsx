import { Auction, Cart, User } from ".prisma/client";
import { Button } from "@chakra-ui/button";
import { Flex, Grid, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import useLightModeCheck from "../../../libs/hooks/useLightModeCheck";
import AuctionBuyModal from "../AuctionBuyWindow.tsx/AuctionBuyModal";

interface AuctionAddToCartProps {
  auction: Auction;
  user?: User & {
    cart: Cart & {
      items: Auction[];
    };
  };
  size?: "md" | "lg";
  seller?: User;
  full?: boolean;
  setInCart: (boolean: boolean) => void;
  inCart: boolean;
}

export default function AuctionAddToCart({
  auction,
  ...props
}: AuctionAddToCartProps): JSX.Element {
  const lightMode = useLightModeCheck();
  const router = useRouter();
  function sendAjaxRequest() {
    // console.log("ZAAAMN");
    if (!props.user) return;
    props.setInCart(true);
    if (props.inCart) {
      router.push("/cart");
    } else {
      axios({
        method: "POST",
        url: "/api/addItemToCart",
        data: { auctionId: auction.id },
      });
    }
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
    <AuctionBuyModal
      seller={props.seller}
      auction={auction}
      inCart={props.inCart}
      user={props.user}
      onPress={sendAjaxRequest}
    >
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
        {props.inCart ? (
          <Flex alignItems="center">W koszyku</Flex>
        ) : (
          <Flex alignItems="center">
            <Text>Dodaj do koszyka |</Text> {renderPrice()}
          </Flex>
        )}
      </Button>
    </AuctionBuyModal>
  );
}
