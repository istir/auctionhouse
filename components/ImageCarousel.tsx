import { Box } from "@chakra-ui/layout";
import React from "react";
// import useEmblaCarousel from "embla-carousel-react";
import { Image } from "@chakra-ui/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@chakra-ui/button";
import useLightModeCheck from "../libs/hooks/useLightModeCheck";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import Image from "next/image"
interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel(props: ImageCarouselProps): JSX.Element {
  const isLightMode = useLightModeCheck();
  // const [emblaRef, emblaApi] = useEmblaCarousel({ containScroll: "keepSnaps" });
  // const [currentImage, setCurrentImage] = React.useState<number>(
  //   emblaApi?.selectedScrollSnap() || 0
  // );
  // const [canScrollLeft, setCanScrollLeft] = React.useState<boolean>(
  //   emblaApi ? emblaApi.canScrollPrev() : false
  // );
  // const [canScrollRight, setCanScrollRight] = React.useState<boolean>(
  //   emblaApi ? emblaApi.canScrollNext() : props.images.length > 1 ? true : false
  // );
  // emblaApi?.on("select", () => {
  //   setCanScrollLeft(emblaApi.canScrollPrev());
  //   setCanScrollRight(emblaApi.canScrollNext());
  //   setCurrentImage(emblaApi?.selectedScrollSnap());
  // });

  function renderImages() {
    return props.images.map((image) => (
      <Image
        key={image}
        src={image}
        alt="Image"
        pos="relative"
        h={["65vh", "65vh", "50vh"]}
        // w="100vw"
        // height={"-webkit-fit-content"}
        pointerEvents="all"
        objectFit="contain"
        // flex="0 0 100%"
        // layout="fill"
      ></Image>
    ));
  }

  function renderLeftArrow(
    clickHandler: () => void,
    hasNext: boolean,
    label: string
  ) {
    return renderArrow("left", clickHandler, hasNext, label);
  }
  function renderRightArrow(
    clickHandler: () => void,
    hasNext: boolean,
    label: string
  ) {
    return renderArrow("right", clickHandler, hasNext, label);
  }
  function renderArrow(
    type: "left" | "right",
    clickHandler: () => void,
    hasNext: boolean,
    label: string
  ) {
    return (
      <Button
        color="black"
        // justifyContent="center"
        alignItems="center"
        // flexDir="row"
        // h="100%"
        visibility={hasNext ? "visible" : "hidden"}
        opacity={hasNext ? "1" : "0"}
        // opacity={emblaApi?.canScrollNext() ? "1" : "0"}
        top="50%"
        transform="translateY(-50%)"
        variant="pill"
        pos="absolute"
        bg="white"
        onClick={clickHandler}
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
  function renderSizeBar(
    clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
    isSelected: boolean,
    index: number,
    label: string
  ) {
    function renderDot(id: number) {
      return (
        <Box
          key={id}
          w="4"
          h="4"
          m="1"
          transform={isSelected ? `scale(1.2)` : "scale(1.0)"}
          transition="0.3s"
          zIndex="5"
          backgroundColor={isLightMode ? "white" : "black"}
          border="2px solid"
          borderColor={isLightMode ? "black" : "white"}
          borderRadius="full"
          value={index}
          display="inline-block"
          onClick={clickHandler}
          cursor="pointer"
        ></Box>
      );
    }
    return renderDot(index);
  }

  return (
    <Box
      h="inherit"
      borderRadius="inherit"
      pointerEvents="all"
      overflow={"hidden"}
    >
      <Box
        h="inherit"
        borderRadius="inherit"
        pointerEvents="all"
        overflow={"hidden"}
      >
        <Carousel
          showArrows
          showThumbs={false}
          showStatus={false}
          emulateTouch
          renderArrowPrev={renderLeftArrow}
          renderArrowNext={renderRightArrow}
          renderIndicator={renderSizeBar}
        >
          {renderImages()}
        </Carousel>
      </Box>
    </Box>
  );
}
