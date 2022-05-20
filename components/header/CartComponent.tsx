import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { Auction } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import useLightModeCheck from "../../libs/useLightModeCheck";
import FormMessage from "../form/FormMessage";

interface CartComponentProps {
  cartItems?: Auction[];
  token?: string;
}

export default function CartComponent(props: CartComponentProps): JSX.Element {
  const isLightMode = useLightModeCheck();
  const router = useRouter();
  const [itemsInCart, setItemsInCart] = React.useState<Auction[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
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
        }
      });
    }
    if (props.cartItems) {
      setItemsInCart(props.cartItems);
    } else {
      getItems();
    }
    return () => {
      //cleanup - ComponentWillUnmount
    };
  }, [props.cartItems, props.token]);
  function renderPrice(originalPrice: number | null, price: number) {
    if (originalPrice && originalPrice > price) {
      return (
        <Grid ml="1" templateRows="auto auto">
          <Text fontSize="x-small" textDecoration="line-through">
            {(originalPrice.toFixed(2) + "")
              .replace(".", ",")
              .replace(",00", "")}{" "}
            zł
          </Text>
          <Text
            color={isLightMode ? "red.600" : "red.400"}
            fontSize="lg"
            fontWeight={"bold"}
          >
            {(price.toFixed(2) + "").replace(".", ",").replace(",00", "")} zł
          </Text>
        </Grid>
      );
    } else {
      return (
        <Text ml="1" fontSize="lg" fontWeight={"bold"}>
          {(price.toFixed(2) + "").replace(".", ",").replace(",00", "")} zł
        </Text>
      );
    }
  }

  return (
    <>
      <Box>
        {itemsInCart.length > 0 ? (
          itemsInCart.map((item) => (
            <Grid
              key={item.id}
              templateColumns={{ lg: "1fr 4fr", sm: "1fr 4fr" }}
              gap="5"
              margin="3"
              padding={{ base: "3", sm: "0" }}
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
              <Flex justifyContent={"center"}>
                <Image
                  maxH="60"
                  src={item.image?.[0]}
                  alt={item.name}
                  borderRadius={{ lg: "0px", base: "lg" }}
                  shadow={{ lg: "0px", base: "lg" }}
                ></Image>
              </Flex>
              <Grid
                templateColumns={{ lg: "3fr 1fr", sm: "1fr" }}
                templateRows={{ sm: "1fr 1fr", lg: "1fr" }}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Grid
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  templateColumns="1fr max-content"
                  mr="5"
                  gap="5"
                >
                  <Text>{item.name}</Text>
                  {renderPrice(item.originalPrice, item.price)}
                </Grid>
                <Flex>
                  <Button
                    colorScheme={"red"}
                    mr="3"
                    borderRadius="full"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      axios({
                        method: "POST",
                        url: "/api/removeItemFromCart",
                        data: { auctionId: item.id },
                      })
                        .then((res) => {
                          console.log(res);
                          if (res.status === 200) {
                            setItemsInCart((prevItems) => {
                              return prevItems.filter((i) => i.id !== item.id);
                            });
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    Usuń
                  </Button>
                </Flex>
              </Grid>
            </Grid>
          ))
        ) : (
          <Flex
            flexDir={"column"}
            justifyContent="center"
            alignItems={"center"}
          >
            <Text>Brak przedmiotów w koszyku.</Text>
            <Button
              m="3"
              onClick={() => {
                router.push("/");
              }}
            >
              Wróć
            </Button>
          </Flex>
        )}

        {itemsInCart.length > 0 ? (
          <Button
            colorScheme={"green"}
            margin="3"
            shadow={"lg"}
            borderRadius="full"
            isLoading={isLoading}
            onClick={async () => {
              setIsLoading(true);
              axios({
                url: "/api/buyItems",
                method: "POST",
                data: { itemIds: itemsInCart.map((i) => i.id) },
              }).then(
                (res) => {
                  setSuccess("Kupiono przedmioty.");
                  setIsLoading(false);
                  setItemsInCart([]);
                },
                (rej) => {
                  setError("Coś poszło nie tak");
                  setIsLoading(false);
                }
              );
            }}
          >
            <Flex alignItems={"center"}>
              <Text>Zamów i zapłać | </Text>

              {renderPrice(getPrice(true), getPrice(false))}
            </Flex>
          </Button>
        ) : null}
        <FormMessage error={error} success={success} />
      </Box>
    </>
  );
}
