import { Auction, Bid } from "@prisma/client";
import React from "react";
import AuctionMoreFromUser from "./AuctionMoreFromUser";

interface AuctionGetRandomAuctionsProps {
  limit?: number;
  auctions?: (Auction & { bids: Bid[] })[];
}

export default function AuctionGetRandomAuctions(
  props: AuctionGetRandomAuctionsProps
): JSX.Element {
  return (
    <AuctionMoreFromUser
      userId={0}
      getRandomAuctions
      limit={props.limit}
      auctions={props.auctions}
    />
  );
}
