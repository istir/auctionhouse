import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { convertMillisecondsToTime, formatTime } from "../../libs/time";

interface AuctionTimerProps {
  dateToEnd: string;
  onEnd?: () => void;
  bought?: number | null;
}

export default function AuctionTimer(props: AuctionTimerProps): JSX.Element {
  const [timeToEnd, setTimeToEnd] = useState(
    calculateRemainingTime(props.dateToEnd)
  );

  React.useEffect(() => {
    if (props.bought) {
      renderRemainingTime("0");
      return () => {};
    } else {
      const timer = renderRemainingTime(props.dateToEnd);

      return () => {
        //cleanup - ComponentWillUnmount
        timer && clearInterval(timer);
      };
    }
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
    if (!deadline && timeToEnd !== "") {
      setTimeToEnd("");
    }

    const timer = setInterval(() => {
      setTimeToEnd(calculateRemainingTime(dateEnd));
    }, 1000);
    return timer;
  }

  function timeColor(dateToEnd: string) {
    if (timeToEnd === "Aukcja zakończona") return "gray.400";
    const deadline = parseInt(dateToEnd);
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
