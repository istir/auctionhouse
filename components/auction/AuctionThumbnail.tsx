import { Auction, Bid } from ".prisma/client";
import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import { Image, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

import React from "react";
import useLightModeCheck from "../../libs/useLightModeCheck";
import AuctionTimer from "./AuctionTimer";

interface AuctionThumbnailProps {
  auction: Auction & { bids: Bid[] };
  width?: string | number;
}
//TODO: auction should have bid, and thumbnail should show latest bid price.
export default function AuctionThumbnail(
  props: AuctionThumbnailProps
): JSX.Element {
  const isLightMode = useLightModeCheck();
  const router = useRouter();
  const auctionColor = useColorModeValue("blackAlpha.500", "whiteAlpha.500");
  const [hover, setHover] = React.useState<boolean>(false);
  function renderImage(image: string) {
    return (
      <Flex flexDir="column">
        {image ? (
          <Image
            width="calc(100% - 2 * var(--chakra-space-2))"
            height={"80"}
            objectFit="contain"
            src={image}
            alt={props.auction.name}
            backgroundColor="white"
            borderRadius="lg"
            shadow="md"
            marginX="auto"
            mt="2"
          />
        ) : (
          <Flex
            width="calc(100% - 2 * var(--chakra-space-2))"
            backgroundColor="white"
            borderRadius="lg"
            shadow="md"
            margin="auto"
            mt="2"
            height={"80"}
            color={"gray.500"}
            justifyContent="center"
            alignItems={"center"}
            fontWeight="bold"
          >
            Brak zdjęcia
          </Flex>
        )}
      </Flex>
    );
  }
  function renderPrice(originalPrice: number | null, price: number) {
    if (originalPrice && originalPrice > price) {
      return (
        <Grid templateColumns={"max-content auto"} gap="2" alignItems="center">
          <Grid templateColumns="max-content auto" alignItems={"center"}>
            <Text
              fontSize="sm"
              textDecoration="line-through"
              color={isLightMode ? "gray.600" : "gray.400"}
            >
              {(originalPrice.toFixed(2) + "")
                .replace(".", ",")
                .replace(",00", "")}
              zł
            </Text>
            <Text
              color={isLightMode ? "red.400" : "red.600"}
              fontSize="lg"
              fontWeight={"bold"}
            >
              {(price.toFixed(2) + "").replace(".", ",").replace(",00", "")} zł
            </Text>
          </Grid>
        </Grid>
      );
    } else if (
      props.auction.bids &&
      props.auction.bids?.length > 0 &&
      props.auction?.bids[props.auction?.bids?.length - 1]?.offer
    ) {
      return (
        <Grid templateColumns={"max-content auto"} gap="2" alignItems="center">
          <Text
            fontWeight={"bold"}
            color={isLightMode ? "gray.600" : "gray.400"}
          >
            {(
              props.auction?.bids[
                props.auction?.bids?.length - 1
              ]?.offer.toFixed(2) + ""
            )
              .replace(".", ",")
              .replace(",00", "")}{" "}
            zł
          </Text>
        </Grid>
      );
    } else {
      return (
        <Grid templateColumns={"max-content auto"} gap="2" alignItems="center">
          <Text
            fontWeight={"bold"}
            color={isLightMode ? "gray.600" : "gray.400"}
          >
            {(price.toFixed(2) + "").replace(".", ",").replace(",00", "")} zł
          </Text>
        </Grid>
      );
    }
  }

  return (
    <Grid
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      minH="80"
      backgroundColor={isLightMode ? `light.primary3` : `dark.primary3`}
      borderRadius="lg"
      shadow={"lg"}
      marginX="3"
      marginY={{ base: "1.5", md: "3" }}
      overflow={"hidden"}
      cursor={"pointer"}
      as={"a"}
      href={`/auction/${props.auction.url}`}
      onClick={() => {
        props.auction.url && router.push(`/auction/${props.auction.url}`);
      }}
      transition="all 0.2s ease-in-out"
      _hover={{ md: { transform: "scale(1.05)" } }}
    >
      {renderImage(props.auction.image[0])}
      <Grid templateRows={"4"} padding="2" pt="0">
        <Text fontSize={"sm"} color={auctionColor}>
          {props.auction.bidding ? "Licytacja" : "Kup Teraz"}
        </Text>
        <Box
          transition={"all"}
          transitionDuration="0.2s"
          fontWeight={"bold"}
          maxH={hover ? "calc( 1.5rem * 5)" : "calc( 1.5rem * 1)"}
          overflow="hidden"
        >
          {props.auction.name}
        </Box>
        {renderPrice(props.auction.originalPrice, props.auction.price)}

        <AuctionTimer
          dateToEnd={props.auction.dateEnd}
          bought={props.auction.buyerId}
        />
      </Grid>
    </Grid>
  );
}
