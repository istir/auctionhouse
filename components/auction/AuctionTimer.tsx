import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { convertMillisecondsToTime, formatTime } from "../../libs/time";

interface AuctionTimerProps {
  dateToEnd: string;
  onEnd?: () => void;
}

export default function AuctionTimer(props: AuctionTimerProps): JSX.Element {
  const [timeToEnd, setTimeToEnd] = useState(
    calculateRemainingTime(props.dateToEnd)
  );

  React.useEffect(() => {
    const timer = renderRemainingTime(props.dateToEnd);

    //effect - ComponentDidUpdate
    return () => {
      //cleanup - ComponentWillUnmount
      timer && clearInterval(timer);
    };
  }, []);

  function calculateRemainingTime(dateEnd: string) {
    const deadline = parseInt(dateEnd);

    const difference = deadline - Date.now();
    if (difference >= 2629800000) {
      return "Więcej niż miesiąc do końca";
    } else if (difference >= 0) {
      return `${formatTime(convertMillisecondsToTime(difference))} do końca`;
    } else {
      props.onEnd?.();
      return "Aukcja zakończona";
    }
  }
  function renderRemainingTime(dateEnd: string) {
    const deadline = parseInt(dateEnd);
    // if(timeToEnd)
    if (!deadline && timeToEnd !== "") {
      setTimeToEnd("");
    }

    const timer = setInterval(() => {
      setTimeToEnd(calculateRemainingTime(dateEnd));
    }, 1000);
    return timer;
  }

  function timeColor(dateToEnd: string) {
    const deadline = parseInt(dateToEnd);
    // if(timeToEnd)
    if (!deadline) return;
    if (deadline - Date.now() < 3600000) return "red.400";
    return "gray.400";
  }
  return (
    <Box noOfLines={1} color={timeColor(props.dateToEnd)}>
      {timeToEnd}
    </Box>
  );
}
