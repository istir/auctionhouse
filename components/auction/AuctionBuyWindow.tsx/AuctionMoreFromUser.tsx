import { Box } from "@chakra-ui/react";
import { Auction } from "@prisma/client";
import axios from "axios";
import React from "react";
import AuctionCarousel from "../AuctionCarousel/AuctionCarousel";

interface AuctionMoreFromUserProps {
  userId: number;
  limit?: number;
}

export default function AuctionMoreFromUser(
  props: AuctionMoreFromUserProps
): JSX.Element {
  const [auctions, setAuctions] = React.useState<Auction[]>([]);
  // const ref = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    axios({
      url: "/api/getAuctionsFromUser",
      method: "GET",
      params: { userId: props.userId, limit: props.limit },
    }).then((res) => {
      if (res.status === 200) {
        const auctions: Auction[] = res.data;
        setAuctions(auctions);
      }
    });
    return () => {
      //cleanup - ComponentWillUnmount
    };
  }, [props.limit, props.userId]);

  return (
    <Box>
      {/* {ref?.current?.clientWidth ? ( */}
      <AuctionCarousel
        auctions={auctions}
        // width={ref?.current?.clientWidth}
      />
      {/* ) : null} */}
    </Box>
  );
}
