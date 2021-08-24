import { Auction } from "@prisma/client";
import React from "react";

interface AuctionProps {
  auction: Auction;
}

export const AuctionComponent: React.FC<AuctionProps> = (props) => {
  return <div>{props.auction.name}</div>;
};
export default AuctionComponent;
