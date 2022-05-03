import { Box, useBreakpointValue } from "@chakra-ui/react";
import { Auction, Bid } from "@prisma/client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import AuctionThumbnail from "../AuctionThumbnail";
interface AuctionCarouselProps {
  auctions: (Auction & { bids: Bid[] })[];
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

  return (
    <Box>
      <Swiper
        slidesPerView={s}
        loop
        loopFillGroupWithBlank
        allowTouchMove
        mousewheel
        keyboard
        navigation={true}
        modules={[Navigation]}
      >
        {props.auctions.map((auction) => (
          <SwiperSlide key={auction?.id}>
            <AuctionThumbnail auction={auction} width={w} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
