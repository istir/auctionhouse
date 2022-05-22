import { Box } from "@chakra-ui/react";
import React from "react";
import ImageCarousel from "../../ImageCarousel";

interface AuctionImagesProps {
  images: string[];
  name: string;
}

export default function AuctionImages(props: AuctionImagesProps): JSX.Element {
  return (
    <Box
      borderRadius={["none", "2xl"]}
      shadow="lg"
      pos="absolute"
      h={["65vh", "65vh", "50vh"]}
      bg="white"
      // margin="auto"
      // w={{
      //   base: "full",
      //   md: "calc(70% - 2 * var(--chakra-space-5))",
      //   lg: "calc(70% - 2 * var(--chakra-space-10))",
      //   xl: "calc(60% - 2 * var(--chakra-space-10))",
      //   "2xl": "calc(50% - 2 * var(--chakra-space-10))",
      // }}
      w={{
        base: "full",
        md: "calc(100% - 2 * var(--chakra-space-5))",
        lg: "calc(100% - 2 * var(--chakra-space-10))",
        xl: "80%",
        "2xl": "60%",
      }}
    >
      <ImageCarousel images={props.images} />
    </Box>
  );
}
