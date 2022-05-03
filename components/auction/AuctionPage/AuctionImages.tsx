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
      w={[
        "full",
        "calc(100% - 2 * var(--chakra-space-5))",
        "calc(100% - 2 * var(--chakra-space-10))",
      ]}
    >
      <ImageCarousel images={props.images} />
    </Box>
  );
}
