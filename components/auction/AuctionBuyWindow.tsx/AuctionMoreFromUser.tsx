import { Box, Text } from "@chakra-ui/react";
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
  }, [props.auctions, props.getRandomAuctions, props.userId, props.limit]);

  return (
    <Box>
      {auctions ? (
        <AuctionCarousel auctions={auctions} smaller={props.smaller} />
      ) : (
        <Text>Brak przedmiotów</Text>
      )}
    </Box>
  );
}
