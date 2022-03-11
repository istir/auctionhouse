import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { Auction } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import useLightModeCheck from "../../libs/hooks/useLightModeCheck";
import Header from "./header";

interface CartComponentProps {
  cartItems?: Auction[];
  token?: string;
}

export default function CartComponent(props: CartComponentProps): JSX.Element {
  const isLightMode = useLightModeCheck();
  const router = useRouter();
  const [itemsInCart, setItemsInCart] = React.useState<Auction[]>([]);
  // const [price, setPrice] = React.useState<number>(getPrice);

  function getPrice(original: boolean, items?: Auction[]) {
    let price = 0;
    const i = items ? items : itemsInCart;
    i?.forEach((item) => {
      price += original ? item.originalPrice || item.price : item.price;
    });
    return price;
  }

  React.useEffect(() => {
    async function getItems() {
      await axios({
        method: "get",
        url: "/api/getItemsFromCart",
        params: { token: props.token },
      }).then((res) => {
        if (res.status == 200) {
          setItemsInCart(res.data as Auction[]);
          // setPrice((prevPrice) => {
          //   return prevPrice + getPrice(res.data as Auction[]);
          // });
        }
      });
    }
    if (props.cartItems) {
      setItemsInCart(props.cartItems);
      // setPrice((prevPrice) => {
      //   return prevPrice + getPrice(props.cartItems);
      // });
    } else {
      getItems();
      // if(items) setItemsInCart(items);
    }
    return () => {
      //cleanup - ComponentWillUnmount
    };
  }, []);
  function renderCorrectPrice(
    currentPrice: number,
    originalPrice: number | null
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
  return (
    <>
      <Header />
      <Box>
        {itemsInCart.map((item) => (
          <Grid
            key={item.id}
            templateColumns="1fr 3fr 1fr 1fr"
            gap="5"
            margin="3"
            borderRadius={"lg"}
            backgroundColor={isLightMode ? `white` : `gray.800`}
            shadow={"lg"}
            overflow="hidden"
            cursor={"pointer"}
            onClick={() => {
              item.url && router.push(`/auction/${item.url}`);
            }}
            transition="all 0.2s ease-in-out"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image src={item.image?.[0]} alt={item.name}></Image>
            <Text>{item.name}</Text>
            {/* <Text>{item.price}zł</Text> */}
            {renderCorrectPrice(item.price, item.originalPrice)}
            <Button colorScheme={"red"} mr="3">
              Usuń
            </Button>
          </Grid>
        ))}

        <Box
          margin="3"
          borderRadius={"lg"}
          backgroundColor={isLightMode ? `white` : `gray.800`}
          shadow={"lg"}
          overflow="hidden"
          width={"min-content"}
          // noOfLines="1"
          padding="2"
        >
          <Box wordBreak="keep-all" whiteSpace="nowrap" display={"flex"}>
            <Text mr="1">Suma: </Text>
            {/* <Text fontWeight={"bold"}>zł</Text> */}
            {renderCorrectPrice(getPrice(false), getPrice(true))}
          </Box>
        </Box>
        <Button colorScheme={"green"} margin="3" shadow={"lg"}>
          Zamów i zapłać
        </Button>
      </Box>
    </>
  );
}
