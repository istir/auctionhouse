import { Grid } from "@chakra-ui/react";
import { Auction, Bid } from "@prisma/client";
import React from "react";
import AuctionThumbnail from "./AuctionThumbnail";

interface AuctionsGridProps {
  auctions: (Auction & { bids: Bid[] })[];
}

export default function AuctionsGrid(props: AuctionsGridProps): JSX.Element {
  return (
    <Grid
      gridTemplateColumns={"repeat(auto-fill,minmax(240px,1fr))"}
      margin={{ md: "4" }}
      // alignItems="center"
    >
      {props.auctions.map((auction) => (
        <AuctionThumbnail auction={auction} key={auction.id} />
      ))}
    </Grid>
  );
}
