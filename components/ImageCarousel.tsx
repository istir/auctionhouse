import { Box } from "@chakra-ui/layout";
import React from "react";
import { Image } from "@chakra-ui/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@chakra-ui/button";
import useLightModeCheck from "../libs/useLightModeCheck";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel(props: ImageCarouselProps): JSX.Element {
  const isLightMode = useLightModeCheck();
  const [prevX, setPrevX] = React.useState<number>(0);
  const [prevY, setPrevY] = React.useState<number>(0);
  function renderImages() {
    return props.images.map((image) => (
      <Image
        userSelect={"none"}
        key={image}
        src={image}
        alt="Image"
        pos="relative"
        h={["65vh", "65vh", "50vh"]}
        pointerEvents="all"
        objectFit="contain"
      ></Image>
    ));
  }

  function renderLeftArrow(clickHandler: () => void, hasNext: boolean) {
    return renderArrow("left", clickHandler, hasNext);
  }
  function renderRightArrow(clickHandler: () => void, hasNext: boolean) {
    return renderArrow("right", clickHandler, hasNext);
  }
  function renderArrow(
    type: "left" | "right",
    clickHandler: () => void,
    hasNext: boolean
  ) {
    return (
      <Button
        color="black"
        alignItems="center"
        visibility={hasNext ? "visible" : "hidden"}
        opacity={hasNext ? "1" : "0"}
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
    clickHandler: (_e: React.MouseEvent | React.KeyboardEvent) => void,
    isSelected: boolean,
    index: number
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
          // @ts-ignore
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
        onTouchStart={(e) => {
          setPrevY(e.touches[0].clientY);
          setPrevX(e.touches[0].clientX);
        }}
        onTouchMoveCapture={(e) => {
          if (
            Math.abs(prevX - e.nativeEvent.changedTouches[0].clientX) <
            Math.abs(prevY - e.nativeEvent.changedTouches[0].clientY)
          ) {
            e.stopPropagation();
          }
        }}
      >
        <Carousel
          showArrows
          showThumbs={false}
          showStatus={false}
          emulateTouch
          renderArrowPrev={renderLeftArrow}
          renderArrowNext={renderRightArrow}
          renderIndicator={renderSizeBar}
          axis="horizontal"
          infiniteLoop={false}
        >
          {renderImages()}
        </Carousel>
      </Box>
    </Box>
  );
}
