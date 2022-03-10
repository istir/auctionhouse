import React from "react";
import AuctionMoreFromUser from "./AuctionMoreFromUser";

interface AuctionGetRandomAuctionsProps {
  limit?: number;
}

export default function AuctionGetRandomAuctions(
  props: AuctionGetRandomAuctionsProps
): JSX.Element {
  return (
    <AuctionMoreFromUser userId={0} getRandomAuctions limit={props.limit} />
  );
}
