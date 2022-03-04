import { Auction, Category, User } from ".prisma/client";
import {
  Box,
  Flex,
  // Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/layout";
import React from "react";
// import useColorSchemeContext from "../../../libs/hooks/useColorSchemeContext";
import useLightModeCheck from "../../../libs/hooks/useLightModeCheck";
// import ColorModeSwitcher from "../../ColorModeSwitcher";
import Header from "../../header/header";
import AuctionHeader from "./AuctionHeader";
import AuctionImages from "./AuctionImages";
import ReactMarkdown from "react-markdown";
import AuctionBuyNow from "./AuctionBuyNow";
import { Image } from "@chakra-ui/image";
import { useBreakpoint } from "@chakra-ui/media-query";
import { useDisclosure } from "@chakra-ui/hooks";
interface AuctionProps {
  user?: User;
  refresh?: () => void;
  auction: Auction & {
    category: Category;
    seller: User;
    buyer: User | null;
  };
}

export default function AuctionCom(props: AuctionProps): JSX.Element {
  const isLightMode = useLightModeCheck();
  // const colorScheme = React.useContext(useColorSchemeContext);
  // const [breakpointSize, setBreakpointSize] = React.useState<string>(
  //   getSize(useBreakpoint())
  // );
  // const [drawerBreakpointSize, setDrawerBreakpointSize] =
  //   React.useState<string>(getSize(useBreakpoint()));
  const { isOpen, onOpen, onClose } = useDisclosure();

  function getSize(currentBreakpoint: string | undefined): string {
    // max-width: var(--chakra-sizes-xs);
    // console.log(currentBreakpoint);

    if (undefined) return "md";
    switch (currentBreakpoint) {
      case "base":
        // setDrawerBreakpointSize("full");
        return "sm";
      case "sm":
        // setDrawerBreakpointSize("full");
        return "full";
      // case "md":
      //   return "lg";
      default:
        // setDrawerBreakpointSize("lg");
        return "lg";
    }
  }
  function getDrawerBreakpointMargin(breakpoint: string | undefined) {
    // const breakpoint = getSize(useBreakpoint());
    console.log(`var(--chakra-sizes-${getSize(breakpoint)})`);
    if (isOpen) {
      return `var(--chakra-sizes-${getSize(breakpoint)})`;
    }
    return "0";
  }
  return (
    <Box>
      {/* <style>{`ul {margin-left:2rem}`}</style> */}
      <Header
        drawerWidth={getSize(useBreakpoint())}
        isDrawerOpen={isOpen}
        onDrawerOpen={onOpen}
        onDrawerClose={onClose}
        user={props.user}
        refresh={props.refresh}
      />

      <Box
        bg={isLightMode ? "white" : "gray.800"}
        m={["0", "10", "20"]}
        // mr={["0","10","20"]}
        shadow={["none", "md"]}
        // px={["3", "10"]}
        // transform={`translateX(${getDrawerBreakpointMargin(useBreakpoint())})`}
        // marginLeft={getDrawerBreakpointMargin(useBreakpoint())}
        // py="8"
        borderRadius="2xl"
        overflow="hidden"
      >
        <AuctionImages
          name={props.auction.name}
          images={props.auction.image}
          // scroll={scroll}
        />
        <Box zIndex="2" pos="relative" mt={["70vh", "70vh", "55vh"]}>
          {/* <AuctionGradient lightMode={isLightMode} /> */}
          {/*//TODO: somehow fix so that gradient won't affect <ImageCarousel/> */}
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
