import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Auction } from "@prisma/client";
import React from "react";
import AuctionComponent from "../auction/Auction";

interface PickedForYouProps {
  auctionsToShow: Auction[];
  width?: string;
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
  ref: React.RefObject<any>;
  constructor(props: PickedForYouProps) {
    super(props);
    // this.state = {
    //   visibleAuctions: [props.auctionsToShow[0], props.auctionsToShow[1]],
    // };
    // this.props.auctionsToShow
    this.ref = React.createRef();
    this.auctionsPicked = [];
    for (let j = 0; j < 3; j += 1) {
      for (let i = 0; i < 8; i += 1) {
        if (this.props.auctionsToShow[i])
          this.auctionsPicked.push(this.props.auctionsToShow[i]);
        // break;
      }
    }

    this.auctionsPicked.push(this.props.auctionsToShow[0]);
    this.state = {
      auctionsSeen: 0,
    };
  }

  moveLeft() {
    this.ref.current.scrollLeft -= 200;
  }
  moveRight() {
    this.ref.current.scrollLeft += 200;
  }

  render() {
    return (
      <div className="relative flex items-center m-4 ">
        <a
          className={`pickedForYouButton float-left z-20 cursor-pointer w-10 h-10  bg-white rounded-full flex shadow-md border-2 border-gray-200 border-opacity-20 -mr-5 hover:scale-110 duration-150`}
          onClick={() => {
            // this.setState((prevState) => {
            //   return { auctionsSeen: prevState.auctionsSeen - 1 };
            // });
            // if (this.state.auctionsSeen < 1) {
            //   this.setState({ auctionsSeen: 6 });
            // }
            this.moveLeft();
          }}
        >
          {<FontAwesomeIcon className="m-auto" icon={faArrowLeft} />}
        </a>
        <div
          id="pickedForYouParent"
          style={{ width: this.props.width ? this.props.width : "600px" }}
          className={`float-left overflow-hidden  rounded-md shadow-md `}
        >
          <div
            id="pickedForYou"
            className=" bg-grey-200 grid p-6 gap-6"
            ref={this.ref}
            // onWheel={(e) => {
            //   console.log(e);
            //   e.deltaX = e.deltaY;
            // }}
            // onWheel={(e) => {
            //   if (e.deltaY > 0) this.ref.current.scrollLeft += 200;
            //   else this.ref.current.scrollLeft -= 200;
            // }}
          >
            {this.auctionsPicked.map((value) => (
              <AuctionComponent key={value.id} auction={value} />
            ))}
          </div>
        </div>
        <a
          className="pickedForYouButton z-20 cursor-pointer w-10 h-10 bg-white rounded-full flex -ml-5 shadow-md border-2 border-gray-200 border-opacity-20 hover:scale-110 duration-150"
          onClick={() => {
            // this.setState((prevState) => {
            //   return {
            //     auctionsSeen:
            //       prevState.auctionsSeen < 6 ? prevState.auctionsSeen + 1 : 0,
            //   };
            // });
            this.moveRight();
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
