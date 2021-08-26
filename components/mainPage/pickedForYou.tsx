import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Auction } from "@prisma/client";
import React from "react";
import AuctionComponent from "../auction/Auction";

interface PickedForYouProps {
  auctionsToShow: Auction[];
}
interface PickedForYouState {
  auctionsSeen: number;
}

/* -------------------------------------------------------------------------- */
/*                        WHAT IS THIS COMPONENT ABOUT?                       */
/* -------------------------------------------------------------------------- */
/* ---------------- for now it's really not that complicated ---------------- */
/* ------ it assumes there's going to be 9 auctions to show EVERY TIME ------ */
/* ------------ (it's configured in #pickedForYou column repeat) ------------ */
/* ---- and, well, it just applies more and more margin until you run out --- */

export default class PickedForYou extends React.Component<
  PickedForYouProps,
  PickedForYouState
> {
  auctionsPicked: any[];
  constructor(props: PickedForYouProps) {
    super(props);
    // this.state = {
    //   visibleAuctions: [props.auctionsToShow[0], props.auctionsToShow[1]],
    // };
    // this.props.auctionsToShow
    this.auctionsPicked = [];

    for (let i = 0; i < 8; i += 1) {
      if (this.props.auctionsToShow[i])
        this.auctionsPicked.push(this.props.auctionsToShow[i]);
      // break;
    }
    this.auctionsPicked.push(this.props.auctionsToShow[0]);
    this.state = {
      auctionsSeen: 0,
    };
  }

  render() {
    return (
      <div className="relative flex items-center">
        <a
          className="pickedForYouButton float-left z-20 cursor-pointer w-10 h-10 bg-white rounded-full flex shadow-md border-2 border-gray-200 border-opacity-20"
          onClick={() => {
            this.setState((prevState) => {
              return { auctionsSeen: prevState.auctionsSeen - 1 };
            });
            if (this.state.auctionsSeen < 1) {
              this.setState({ auctionsSeen: 6 });
            }
          }}
        >
          {<FontAwesomeIcon className="m-auto" icon={faArrowLeft} />}
        </a>
        <div
          id="pickedForYouParent"
          className="float-left overflow-hidden -ml-5 rounded-md shadow-md"
        >
          <div
            id="pickedForYou"
            className=" bg-grey-200 grid p-6 gap-6"
            style={{
              marginLeft: `calc((var(--auction-width)  + 1.5rem) * -1 * ${this.state.auctionsSeen})`,
            }}
          >
            {this.auctionsPicked.map((value) => (
              <AuctionComponent key={value.id} auction={value} />
            ))}
          </div>
        </div>
        <a
          className="pickedForYouButton z-20 cursor-pointer w-10 h-10 bg-white rounded-full flex -ml-5 shadow-md border-2 border-gray-200 border-opacity-20"
          onClick={() => {
            this.setState((prevState) => {
              return {
                auctionsSeen:
                  prevState.auctionsSeen < 6 ? prevState.auctionsSeen + 1 : 0,
              };
            });
            // if (this.state.auctionsSeen > 6) {
            //   this.setState({ auctionsSeen: 0 });
            // }
          }}
        >
          {<FontAwesomeIcon className="m-auto" icon={faArrowRight} />}
        </a>
      </div>
    );
  }
}
