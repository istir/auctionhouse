import { Auction, Category, User } from ".prisma/client";
import {
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/layout";
import React from "react";
import useColorSchemeContext from "../../../libs/hooks/useColorSchemeContext";
import useLightModeCheck from "../../../libs/hooks/useLightModeCheck";
import ColorModeSwitcher from "../../ColorModeSwitcher";
import Header from "../../header/header";
import AuctionHeader from "./AuctionHeader";
import AuctionImages from "./AuctionImages";
import ReactMarkdown from "react-markdown";
import AuctionBuyNow from "./AuctionBuyNow";
import { Image } from "@chakra-ui/image";
interface AuctionProps {
  auction: Auction & {
    category: Category;
    seller: User;
    buyer: User | null;
  };
}

export default function AuctionCom(props: AuctionProps): JSX.Element {
  const isLightMode = useLightModeCheck();
  const colorScheme = React.useContext(useColorSchemeContext);

  const [scroll, setScroll] = React.useState<number>(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        setScroll(window.scrollY);
      });
    };
  }, []);
  function gradientTransform() {
    if (scroll < 100) {
      return `scaleY(${scroll / 100})`;
    } else {
      return "scaleY(1)";
    }
  }
  function gradientOpacity() {
    if (scroll < 200) {
      return `${(scroll * 0.5) / 100}`;
    } else {
      return "1";
    }
  }
  return (
    <Box>
      {/* <style>{`ul {margin-left:2rem}`}</style> */}
      <Header />
      <ColorModeSwitcher zIndex="2" variant="transparent" />
      <Box
        bg={isLightMode ? "white" : "gray.800"}
        m={["0", "10", "20"]}
        shadow={["none", "md"]}
        // px={["3", "10"]}
        // py="8"
        borderRadius="2xl"
        overflow="hidden"
      >
        <AuctionImages
          name={props.auction.name}
          image={props.auction.image}
          scroll={scroll}
        />
        <Box zIndex="2" pos="relative" mt={["65vh", "65vh", "50vh"]}>
          <Box
            mt="-52"
            bgImage={`linear-gradient(180deg, rgba(255,0,0,0) 0%, var(--chakra-colors-${
              isLightMode ? "white" : "gray-800"
            }) 100%);`}
            // transform={gradientTransform()}
            style={{
              opacity: gradientOpacity(),
            }}
            // opacity={gradientOpacity()}
            transformOrigin="bottom"
            h="48"
          ></Box>
          <Box
            // bg={isLightMode ? "gray.50" : "gray.900"}
            bg={isLightMode ? "white" : "gray.800"}
            px={["3", "10"]}
            // borderBottomRadius="2xl"

            // mt="-6"
          >
            <AuctionHeader auction={props.auction} />
            <Box zIndex="2" pos="relative" mt="5">
              {props.auction.markdown ? (
                <ReactMarkdown
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
                        // style={{ background: "#000" }}
                        // children={node.children}
                        ml="8"
                        {...props}
                      ></UnorderedList>
                    ),
                    li: ({ node, ...props }) => (
                      <ListItem
                        {...props}
                        ordered={props.ordered + ""}
                      ></ListItem>
                    ),
                  }}
                >
                  {props.auction.markdown}
                </ReactMarkdown>
              ) : null}
            </Box>
            <Flex justifyContent="center" my="4">
              <AuctionBuyNow auction={props.auction} size="lg" full />
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
