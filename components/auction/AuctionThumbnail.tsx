import { Auction, Bid } from ".prisma/client";
import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import { Image, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

import React, { useContext } from "react";
import useColorSchemeContext from "../../libs/hooks/useColorSchemeContext";
import useLightModeCheck from "../../libs/hooks/useLightModeCheck";
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
  const { color } = useContext(useColorSchemeContext);
  const router = useRouter();
  const auctionColor = useColorModeValue("blackAlpha.500", "whiteAlpha.500");
  const [hover, setHover] = React.useState<boolean>(false);
  // const auctionColor = useColorModeValue(
  //   props.auction.bidding ? "red.400" : "green.400",
  //   props.auction.bidding ? "red.700" : "green.700"
  // );
  function renderImage(image: string) {
    // if (!image) return <Box></Box>;
    return (
      <Flex flexDir="column">
        {image ? (
          <Image
            width="calc(100% - 2 * var(--chakra-space-2))"
            // mx="2"
            // height="full"
            height={"80"}
            objectFit="contain"
            src={image}
            alt={props.auction.name}
            backgroundColor="white"
            // borderBottomRadius={"lg"}
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
            height={"full"}
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
            // fontSize="lg"
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
            // fontSize="lg"
            fontWeight={"bold"}
            color={isLightMode ? "gray.600" : "gray.400"}
          >
            {(price.toFixed(2) + "").replace(".", ",").replace(",00", "")} zł
          </Text>
        </Grid>
      );
    }
  }
  /*
  function renderCorrectPrice(
    originalPrice: number | null,
    currentPrice: number
  ) {
    function renderOldPrice(oldPrice: number) {
      return (
        <Box
          display="inline-block"
          color={isLightMode ? "gray.600" : "gray.400"}
          fontSize={"sm"}
          fontWeight={"normal"}
          textDecoration={"line-through"}
          // textTransform={"uppercase"}
          marginRight="1.5"
        >
          {(oldPrice.toFixed(2) + "").replace(".", ",").replace(",00", "")} zł
        </Box>
      );
    }
    function renderCurrentPrice(currentPrice: number, sale: boolean) {
      return (
        <Box
          display="inline-block"
          fontWeight={"bold"}
          fontSize={sale ? "lg" : "md"}
          color={sale ? (isLightMode ? "red.400" : "red.600") : "current"}
        >
          {currentPrice} zł
        </Box>
      );
    }
    if (originalPrice && originalPrice > currentPrice) {
      // return <span className="line-through text-grey-400 font-semibold"></span>;
      return (
        <Flex alignItems={"center"}>
          {renderOldPrice(originalPrice)}
          {renderCurrentPrice(currentPrice, true)}
        </Flex>
      );
    } else {
      return renderCurrentPrice(currentPrice, false);
    }
  }
  */
  return (
    <Grid
      onMouseEnter={(e) => {
        setHover(true);
      }}
      onMouseLeave={(e) => {
        setHover(false);
      }}
      // minH={{ base: "20", md: "80" }}
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
      // templateRows="auto max-content"
    >
      {renderImage(props.auction.image[0])}
      <Grid templateRows={"4"} padding="2" pt="0">
        <Text
          fontSize={"sm"}
          color={auctionColor}
          // pos="absolute"
          // backgroundColor={"blackAlpha.500"}
          // p="2"
          // borderTopLeftRadius={"lg"}
          // borderBottomRightRadius={"md"}
          // fontWeight="bold"
          // color={auctionColor}
          // mx="2"
        >
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

        <AuctionTimer dateToEnd={props.auction.dateEnd} />
      </Grid>
    </Grid>
  );
}
