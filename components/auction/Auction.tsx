import { Auction } from "@prisma/client";
import React, { useState } from "react";
import { localizePersonsBought } from "../../libs/localizeStrings";
import { convertMillisecondsToTime, formatTime } from "../../libs/time";
import { RemainingTime } from "../../types";

interface AuctionProps {
  auction: Auction;
}

export const AuctionComponent: React.FC<AuctionProps> = (props) => {
  const [timeToEnd, setTimeToEnd] = useState("Czas do końca");
  function renderImage(imageUrl: string) {
    if (imageUrl) {
      return (
        <img
          className="w-full h-56 rounded-md shadow-lg object-contain bg-white duration-300 border-2 border-gray-200 border-opacity-20"
          src={imageUrl}
        ></img>
      );
    } else {
      return (
        <img className="bg-white w-full h-56 rounded-md shadow-lg duration-300 border-2 border-gray-200 border-opacity-20"></img>
      );
    }
  }

  function renderOldPrice(price: number, originalPrice?: number | null) {
    if (originalPrice && originalPrice > price) {
      return (
        <span className="line-through text-grey-400 font-semibold">
          {(originalPrice.toFixed(2) + "").replace(".", ",").replace(",00", "")}{" "}
          zł
        </span>
      );
    }
  }
  function renderRemainingTime(dateEnd: string) {
    const deadline = parseInt(dateEnd);
    // if(timeToEnd)
    if (!deadline && timeToEnd !== "") {
      setTimeToEnd("");
    }

    const timer = setInterval(() => {
      const difference = deadline - Date.now();
      if (timeToEnd !== "00:00:00")
        setTimeToEnd(
          difference >= 0
            ? formatTime(convertMillisecondsToTime(difference, "hours")) +
                " do końca"
            : "00:00:00"
        );
    }, 1000);
  }
  renderRemainingTime(props.auction.dateEnd);

  function timeColor(dateToEnd: string) {
    const deadline = parseInt(dateToEnd);
    // if(timeToEnd)
    if (!deadline) return;
    if (deadline - Date.now() < 3600000) return "text-red-400";
    return "text-gray-400";
  }
  return (
    <div className="auction bg-white flex flex-col  p-3 rounded-md shadow-md cursor-pointer select-none ">
      {renderImage(props.auction.image)}
      {/* <div>{renderRemainingTime(props.auction.dateEnd)}</div> */}
      <div className="grid grid-cols-2 col-start-1 ">
        {renderOldPrice(props.auction.price, props.auction.originalPrice)}
        <span
          className={`text-right col-start-2 font-semibold ${timeColor(
            props.auction.dateEnd
          )}`}
        >
          {timeToEnd}
        </span>
      </div>
      {
        <div>
          <span className="text-grey-600 font-bold text-lg">
            {(props.auction.price.toFixed(2) + "")
              .replace(".", ",")
              .replace(",00", "")}{" "}
            zł
          </span>
        </div>
      }
      <div className="grid auction-name-persons">
        <div className="text-grey-500 font-semibold overflow-ellipsis overflow-hidden">
          {props.auction.name}
        </div>
        <div className="text-grey-400 font-semibold">
          {localizePersonsBought(props.auction.usersBought)}
        </div>
      </div>
    </div>
  );

  // return <div>{props.auction.name}</div>;
};
export default AuctionComponent;
