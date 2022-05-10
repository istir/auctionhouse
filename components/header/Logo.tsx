import {
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaShoppingBasket } from "react-icons/fa";

interface LogoProps {}

export default function Logo(props: LogoProps): JSX.Element {
  const breakpoint = useBreakpointValue({ base: "none", md: "block" });
  const breakpointSize = useBreakpointValue({ base: "2rem", md: "1.5rem" });
  return (
    <Flex
      justifyContent={"center"}
      //   height="10"
      alignItems="center"
      gap="2"
      color="transparent"
      className="logo"
      background={`linear-gradient(133deg, ${useColorModeValue(
        "var(--chakra-colors-light-primary)",
        "var(--chakra-colors-dark-primary)"
      )}, ${useColorModeValue(
        "var(--chakra-colors-light-tertiary)",
        "var(--chakra-colors-dark-tertiary)"
      )});`}
      backgroundClip="text"
    >
      <FaShoppingBasket
        size={breakpointSize}
        color={useColorModeValue(
          "var(--chakra-colors-light-primary)",
          "var(--chakra-colors-dark-primary)"
        )}
      />

      <Text fontWeight={"bold"} display={breakpoint}>
        auctionhouse
      </Text>
    </Flex>
  );
}
