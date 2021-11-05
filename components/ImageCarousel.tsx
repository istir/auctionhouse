import { Box, Flex, Grid } from "@chakra-ui/layout";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Image } from "@chakra-ui/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@chakra-ui/button";
import useLightModeCheck from "../libs/hooks/useLightModeCheck";
// import Image from "next/image"
interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel(props: ImageCarouselProps): JSX.Element {
  const isLightMode = useLightModeCheck();
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [currentImage, setCurrentImage] = React.useState<number[]>(
    emblaApi?.slidesInView() || [0]
  );
  const [canScrollLeft, setCanScrollLeft] = React.useState<boolean>(
    emblaApi ? emblaApi.canScrollPrev() : false
  );
  const [canScrollRight, setCanScrollRight] = React.useState<boolean>(
    emblaApi ? emblaApi.canScrollNext() : props.images.length > 1 ? true : false
  );
  emblaApi?.on("settle", () => {
    setCanScrollLeft(emblaApi.canScrollPrev());
    setCanScrollRight(emblaApi.canScrollNext());
    // console.log(emblaApi?.slidesInView());
    // setCurrentImage(emblaApi?.slidesInView() || [0]);
  });

  function renderImages() {
    return props.images.map((image) => (
      <Image
        key={image}
        src={image}
        alt="Image"
        pos="relative"
        w="100%"
        pointerEvents="all"
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
            // setCanScrollLeft(emblaApi.canScrollPrev());
            // setCanScrollRight(emblaApi.canScrollNext());
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
  function renderSizeBar() {
    function renderDot(id: number) {
      return (
        <Box
          key={id}
          w="4"
          h="4"
          m="1"
          transform={
            emblaApi?.slidesInView().includes(id) ? `scale(1.2)` : "scale(1.0)"
          }
          transition="0.3s"
          zIndex="5"
          backgroundColor={isLightMode ? "white" : "black"}
          border="2px solid"
          borderColor={isLightMode ? "black" : "white"}
          borderRadius="full"
        ></Box>
      );
    }
    return (
      <Flex
        mt="-10"
        color="black"
        justifySelf="center"
        alignSelf="center"
        justifyContent="center"
      >
        {props.images.map((image, index) => {
          return renderDot(index);
        })}
      </Flex>
    );
  }

  return (
    <Box h="inherit" borderRadius="inherit" pointerEvents="all">
      <Box h="inherit" borderRadius="inherit" pointerEvents="all">
        {renderArrow("left")}
        <Box
          ref={emblaRef}
          pointerEvents="all"
          h="inherit"
          overflow="hidden"
          borderRadius="inherit"
        >
          <Flex h="inherit" pointerEvents="all">
            {renderImages()}
          </Flex>
        </Box>
        {renderArrow("right")}
      </Box>
      {renderSizeBar()}
    </Box>
  );
}
