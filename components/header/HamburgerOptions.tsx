import { Box, VStack } from "@chakra-ui/layout";
import React from "react";

interface HamburgerOptionsProps {}

export default function HamburgerOptions(
  props: HamburgerOptionsProps
): JSX.Element {
  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <VStack>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
      </VStack>
    </Box>
  );
}
