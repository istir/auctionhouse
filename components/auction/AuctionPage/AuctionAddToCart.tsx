import { Auction, Cart, User } from ".prisma/client";
import { Button } from "@chakra-ui/button";
import { Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import useLightModeCheck from "../../../libs/hooks/useLightModeCheck";
import NextButton from "../../NextButton";
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
  setInCart: (_boolean: boolean) => void;
  inCart: boolean;
}

export default function AuctionAddToCart({
  auction,
  ...props
}: AuctionAddToCartProps): JSX.Element {
  const lightMode = useLightModeCheck();
  const color = useColorModeValue("light.primary4", "dark.primary4");
  const router = useRouter();
  function sendAjaxRequest() {
    // if (!props.user) return;
    console.log("props.user");
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
  if (auction.buyerId)
    return (
      <Flex
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Text>Spóźniłeś się!</Text>
        <Text fontWeight={"bold"}>Aukcja zakończona</Text>
        <NextButton
          variant="pill"
          backgroundColor={color}
          href={`/user/${auction.sellerId}`}
        >
          Zobacz inne aukcje sprzedającego
        </NextButton>
      </Flex>
    );
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
