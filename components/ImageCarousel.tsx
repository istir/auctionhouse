import { Box, Flex, Grid } from "@chakra-ui/layout";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Image } from "@chakra-ui/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@chakra-ui/button";
// import Image from "next/image"
interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel(props: ImageCarouselProps): JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [canScrollLeft, setCanScrollLeft] = React.useState<boolean>(
    emblaApi ? emblaApi.canScrollPrev() : false
  );
  const [canScrollRight, setCanScrollRight] = React.useState<boolean>(
    emblaApi ? emblaApi.canScrollNext() : props.images.length > 1 ? true : false
  );
  function renderImages() {
    return props.images.map((image) => (
      <Image
        key={image}
        src={image}
        alt="Image"
        pos="relative"
        w="100%"
        objectFit="contain"
        // flex="0 0 100%"
        // layout="fill"
      ></Image>
    ));
  }
  function renderArrow(type: "left" | "right") {
    return (
      <Button
        color="black"
        // justifyContent="center"
        alignItems="center"
        // flexDir="row"
        // h="100%"
        visibility={
          type == "left"
            ? canScrollLeft
              ? "visible"
              : "hidden"
            : canScrollRight
            ? "visible"
            : "hidden"
        }
        opacity={
          type == "left"
            ? canScrollLeft
              ? "1"
              : "0"
            : canScrollRight
            ? "1"
            : "0"
        }
        // opacity={emblaApi?.canScrollNext() ? "1" : "0"}
        top="50%"
        transform="translateY(-50%)"
        variant="pill"
        pos="absolute"
        bg="white"
        transparent="false"
        onClick={() => {
          if (emblaApi) {
            if (type == "left") emblaApi.scrollPrev();
            if (type == "right") emblaApi.scrollNext();
            setCanScrollLeft(emblaApi.canScrollPrev());
            setCanScrollRight(emblaApi.canScrollNext());
          }
        }}
        w="14"
        h="14"
        left={type == "left" ? 0 : "auto"}
        right={type == "right" ? 0 : "auto"}
        fontSize="2xl"
        zIndex="2"
      >
        {type == "left" ? <FaChevronLeft /> : <FaChevronRight />}
      </Button>
    );
  }

  return (
    <Flex h="inherit" borderRadius="inherit">
      {renderArrow("left")}
      <Box ref={emblaRef} h="inherit" overflow="hidden" borderRadius="inherit">
        <Flex h="inherit">{renderImages()}</Flex>
      </Box>
      {renderArrow("right")}
    </Flex>
  );
}
