import { Auction } from "@prisma/client";
import React, { useState } from "react";

interface AuctionProps {
  auction: Auction;
}

export const AuctionComponent: React.FC<AuctionProps> = (props) => {
  const [timeToEnd, setTimeToEnd] = useState("");
  const [timerId, setTimerId] = useState();
  function renderImage(imageUrl: string) {
    if (imageUrl) {
      return <img className="w-full h-full" src={imageUrl}></img>;
    } else {
      return <div className="bg-black w-full h-full"></div>;
    }
  }

  function convertMillisecondsToBetterTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    console.log(seconds);
    // if (seconds <= 0) return milliseconds;
    let minutes = Math.floor(seconds / 60);
    // if (minutes <= 0) return seconds;
    let hours = Math.floor(minutes / 60);
    // if (hours <= 0) return minutes;
    let days = Math.floor(hours / 24);
    // if (days <= 0) return hours;
    let months = Math.floor(days / 30);
    // if (months <= 0) return days;
    hours = hours - days * 24;
    // console.log(minutes);
    minutes = hours * 60 - days * 24 * 60;
    seconds = minutes * 60 - days * 24 * 60 * 60;
    return `${months > 0 ? `${months} miesiąc ` : " "}${
      days > 0 ? `${days} dni` : " "
    }${hours > 0 ? `${hours} godzin` : " "}${
      minutes > 0 ? `${minutes} minut` : " "
    }${seconds > 0 ? `${seconds} sekund` : " "}`;
  }

  function renderRemainingTime(dateEnd: string) {
    const deadline = parseInt(dateEnd);
    // if(timeToEnd)
    if (!deadline && timeToEnd !== "Koniec") {
      setTimeToEnd("Koniec");
    }
    setInterval(() => {
      const difference = deadline - Date.now();
      setTimeToEnd(
        difference >= 0
          ? convertMillisecondsToBetterTime(difference) + ""
          : "Koniec"
      );
    }, 1000);
  }
  renderRemainingTime(props.auction.dateEnd);
  return (
    <div>
      {renderImage(props.auction.image)}
      {/* <div>{renderRemainingTime(props.auction.dateEnd)}</div> */}
      <div>{timeToEnd}</div>
      {props.auction.name}
    </div>
  );

  // return <div>{props.auction.name}</div>;
};
export default AuctionComponent;
