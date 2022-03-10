import { Box, useBreakpointValue } from "@chakra-ui/react";
import { Auction } from "@prisma/client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import AuctionThumbnail from "../AuctionThumbnail";
interface AuctionCarouselProps {
  auctions: Auction[];
  // width?: number;
  size?: number;
  smaller?: boolean;
}

export default function AuctionCarousel(
  props: AuctionCarouselProps
): JSX.Element {
  const s =
    useBreakpointValue([
      2,
      3,
      props.smaller ? 3 : 4,
      props.smaller ? 3 : 4,
      props.smaller ? 4 : 5,
    ]) || 3;
  const w = useBreakpointValue({ base: 170, sm: 160, md: 180, lg: 230 });

  // const [prevWidth, setPrevWidth] = React.useState<number>(0);
  // const ref = useRef<HTMLDivElement>(null);
  // const [count, setCount] = React.useState<number>(calculateCount);
  // if (typeof window !== "undefined") {
  //   window.addEventListener("resize", () => {
  //     setCount(calculateCount);
  //   });
  // }

  // function calculateCount() {
  //   // console.log("prop?", props.width);
  //   // console.log("update");
  //   // const w = 256;
  //   if (
  //     ref &&
  //     ref?.current?.clientWidth &&
  //     ref?.current?.clientWidth !== prevWidth &&
  //     ref?.current?.clientWidth > 0 &&
  //     w
  //   ) {
  //     setPrevWidth(ref?.current?.clientWidth);
  //     return Math.floor(ref?.current?.clientWidth / w);
  //   } else if (ref?.current?.clientWidth !== prevWidth && w) {
  //     if (typeof window !== "undefined") {
  //       // console.log("window width: ", window.innerWidth);
  //       return Math.floor(window?.innerWidth / w);
  //     } else return 3;
  //     // if (window !== undefined && window.innerWidth > 0) {
  //     //   // return Math.floor(window?.innerWidth / 256);
  //     //   return 1;
  //     // } else
  //     // return 3;
  //   } else return count;
  // }
  return (
    // <Box ref={ref}>
    <Box>
      <Swiper
        slidesPerView={s}
        loop
        loopFillGroupWithBlank
        allowTouchMove
        mousewheel
        keyboard
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[Navigation]}
      >
        {props.auctions.map((auction) => (
          <SwiperSlide key={auction.id}>
            <AuctionThumbnail auction={auction} width={w} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
