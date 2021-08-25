import { Auction } from "@prisma/client";
import React from "react";
import AuctionComponent from "../auction/Auction";

interface PickedForYouProps {
  auctionsToShow: Auction[];
}
interface PickedForYouState {}

export default class PickedForYou extends React.Component<
  PickedForYouProps,
  PickedForYouState
> {
  render() {
    return (
      <div id="pickedForYou" className="bg-grey-200 grid grid-flow-col">
        {this.props.auctionsToShow.map((value) => (
          <AuctionComponent key={value.id} auction={value} />
        ))}
      </div>
    );
  }
}
