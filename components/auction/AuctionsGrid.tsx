import { Box, Grid } from "@chakra-ui/react";
import { Auction, Bid } from "@prisma/client";
import React from "react";
import Pagination from "../Pagination";
import AuctionThumbnail from "./AuctionThumbnail";

interface AuctionsGridProps {
  auctions: (Auction & { bids: Bid[] })[];
  hideEnded?: boolean;
  page?: number;
  allPages?: number;
}

export default function AuctionsGrid(props: AuctionsGridProps): JSX.Element {
  return (
    <Box>
      <Grid
        gridTemplateColumns={"repeat(auto-fill,minmax(240px,1fr))"}
        margin={{ md: "4" }}
        // alignItems="center"
      >
        {props.auctions.map(
          (auction) =>
            props.hideEnded || (
              <AuctionThumbnail auction={auction} key={auction.id} />
            )
        )}
      </Grid>
      {props.page && props.allPages && (
        <Pagination
          allPages={props.allPages}
          page={props.page}
          hideIfZero
          functionToApply={(page: number) => {
            return `/?p=${page}`;
          }}
        />
      )}
    </Box>
  );
}
