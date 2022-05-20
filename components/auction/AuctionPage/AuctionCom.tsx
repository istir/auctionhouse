import { Auction, Bid, Cart, Category, User } from ".prisma/client";
import { Box, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/layout";
import React from "react";
import useLightModeCheck from "../../../libs/useLightModeCheck";
import AuctionHeader from "./AuctionHeader";
import AuctionImages from "./AuctionImages";
import ReactMarkdown from "react-markdown";
import { Image } from "@chakra-ui/image";

import AuctionAddToCart from "./AuctionAddToCart";
import Header from "../../header/header";
import PopupLogin from "../../login/PopupLogin";
interface AuctionProps {
  user?: User & {
    cart: Cart & {
      items: Auction[];
    };
  };
  refresh?: () => void;
  auction: Auction & {
    category: Category;
    seller: User;
    buyer: User | null;
    bids: Bid[];
  };
}

export default function AuctionCom(props: AuctionProps): JSX.Element {
  const isLightMode = useLightModeCheck();
  const [inCart, setInCart] = React.useState<boolean>(
    (props.user?.cart?.items.filter((item) => item.id === props.auction.id)
      .length as number) > 0
  );

  return (
    <Box>
      <Header user={props.user} refresh={props.refresh} />

      <Box
        bg={isLightMode ? "light.primary1" : "dark.primary1"}
        m={["0", "5", "10"]}
        shadow={["none", "md"]}
        borderRadius="2xl"
        overflow="hidden"
      >
        <AuctionImages name={props.auction.name} images={props.auction.image} />
        <Box zIndex="2" pos="relative" mt={["70vh", "70vh", "55vh"]}>
          <Box
            bg={isLightMode ? "light.primary1" : "dark.primary1"}
            px={["3", "10"]}
          >
            <AuctionHeader
              auction={props.auction}
              user={props.user}
              setInCart={setInCart}
              inCart={inCart}
              refresh={props.refresh}
            />
            <Box zIndex="2" pos="relative" mt="5">
              {props.auction.markdown
                ? props.auction.markdown.split("\\n").map((item) => (
                    <ReactMarkdown
                      key={item}
                      components={{
                        h1: ({ node, ...props }) => (
                          <Text
                            my="2"
                            fontSize="x-large"
                            fontWeight="semibold"
                            {...props}
                          ></Text>
                        ),
                        img: ({ node, ...props }) => (
                          <Image my="2" alt={props.alt} {...props}></Image>
                        ),
                        h2: ({ node, ...props }) => (
                          <Text
                            my="2"
                            fontSize="xl"
                            fontWeight="semibold"
                            {...props}
                          ></Text>
                        ),
                        ul: ({ node, ...props }) => (
                          <UnorderedList
                            ml="8"
                            {...props}
                            // @ts-ignore
                            ordered={props.ordered.toString()}
                          ></UnorderedList>
                        ),
                        li: ({ node, ...props }) => (
                          <ListItem
                            {...props}
                            // @ts-ignore
                            ordered={props.ordered + ""}
                          ></ListItem>
                        ),
                      }}
                    >
                      {item}
                    </ReactMarkdown>
                  ))
                : null}
            </Box>

            <Flex justifyContent="center" my="4">
              {props.auction.bidding ||
                (props.user ? (
                  <AuctionAddToCart
                    user={props.user}
                    inCart={inCart}
                    setInCart={setInCart}
                    auction={props.auction}
                    seller={props.auction.seller}
                    size="lg"
                    full
                  />
                ) : (
                  <PopupLogin
                    refresh={props.refresh}
                    text="Zaloguj się i dodaj do koszyka!"
                  />
                ))}
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
