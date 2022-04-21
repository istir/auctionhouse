import { Box } from "@chakra-ui/react";
import { Auction, Bid } from "@prisma/client";
import axios from "axios";
import React from "react";
import AuctionCarousel from "../AuctionCarousel/AuctionCarousel";

interface AuctionMoreFromUserProps {
  userId: number;
  getRandomAuctions?: boolean;
  limit?: number;
  smaller?: boolean;
  auctions?: (Auction & { bids: Bid[] })[];
}

export default function AuctionMoreFromUser(
  props: AuctionMoreFromUserProps
): JSX.Element {
  const [auctions, setAuctions] = React.useState<(Auction & { bids: Bid[] })[]>(
    []
  );
  // const ref = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (props.auctions && props.auctions.length > 0) {
      setAuctions(props.auctions);
    } else if (props.getRandomAuctions || props.userId == 0) {
      axios({
        url: "/api/getRandomAuctions",
        method: "GET",
        params: { limit: props.limit },
      }).then((res) => {
        if (res.status === 200) {
          const auctions: (Auction & { bids: Bid[] })[] = res.data;
          setAuctions(auctions);
        }
      });
    } else {
      axios({
        url: "/api/getAuctionsFromUser",
        method: "GET",
        params: { userId: props.userId, limit: props.limit },
      }).then((res) => {
        if (res.status === 200) {
          const auctions: (Auction & { bids: Bid[] })[] = res.data;
          setAuctions(auctions);
        }
      });
    }
    return () => {
      //cleanup - ComponentWillUnmount
    };
  }, [props.limit, props.userId]);

  return (
    <Box>
      {/* {ref?.current?.clientWidth ? ( */}
      <AuctionCarousel
        auctions={auctions}
        smaller={props.smaller}
        // width={ref?.current?.clientWidth}
      />
      {/* ) : null} */}
    </Box>
  );
}
