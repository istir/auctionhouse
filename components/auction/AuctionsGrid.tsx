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
      // gridTemplateRows={"repeat(auto-fit,minmax(500px,1fr))"}
      margin="4"
    >
      {props.auctions.map((auction) => (
        <AuctionThumbnail auction={auction} key={auction.id} />
      ))}
    </Grid>
  );
}
