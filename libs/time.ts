import { RemainingTime } from "../types";
import padWithZeroes from "./padWithZeroes";

export function convertMillisecondsToTime(
  milliseconds: number,
  biggest?: "months" | "days" | "hours" | "minutes" | "seconds"
): RemainingTime {
  const months = 0;
  const days = padWithZeroes(Math.floor(milliseconds / (1000 * 60 * 60 * 24)));
  const hours = padWithZeroes(
    Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const minutes = padWithZeroes(
    Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
  );
  const seconds = padWithZeroes(
    Math.floor((milliseconds % (1000 * 60)) / 1000)
  );
  //--------
  // const convertedSeconds = Math.floor(milliseconds / 1000);
  // let months;
  // let days;
  // let hours;
  // let minutes;
  // let seconds;
  // const b = biggest || "months";
  // if (b === "months") months = Math.floor(convertedSeconds / (3600 * 24 * 30));
  // if (b === "months" || b === "days" || !months)
  //   days = Math.floor(
  //     (convertedSeconds - (months || 0) * 3600 * 24 * 30) / (3600 * 24)
  //   );
  // if (b === "months" || b === "days" || b === "hours" || (!months && !days))
  //   hours = Math.floor(
  //     ((convertedSeconds - (days || 0) * (3600 * 24)) % (3600 * 24)) / 3600
  //   );
  // if (
  //   b === "months" ||
  //   b === "days" ||
  //   b === "hours" ||
  //   b === "minutes" ||
  //   (!months && !days && !hours)
  // )
  //   minutes = Math.floor((convertedSeconds % 3600) / 60);
  // if (
  //   b === "months" ||
  //   b === "days" ||
  //   b === "hours" ||
  //   b === "minutes" ||
  //   b === "seconds" ||
  //   (!months && !days && !hours && !minutes)
  // )
  //   seconds = Math.floor(convertedSeconds % 60);
  // // return `${months > 0 ? `${months} miesiąc ` : " "}${
  // //   days > 0 ? `${days} dni` : " "
  // // }${hours > 0 ? `${hours} godzin` : " "}${
  // //   minutes > 0 ? `${minutes} minut` : " "
  // // }${seconds > 0 ? `${seconds} sekund` : " "}`;
  return { months, days, hours, minutes, seconds };
}

export function formatTime(time: RemainingTime) {
  let str = `${
    time.months
      ? time.months > 0
        ? `${time.months}  ${time.months == 1 ? "miesiąc" : "miesięcy"} `
        : ""
      : ""
  }${
    time.days
      ? time.days > 0
        ? `${time.days} ${time.days == 1 ? "dzień" : "dni"} `
        : ""
      : ""
  }${time.hours ? (time.hours > 0 ? `${time.hours}:` : "00") : ""}${
    time.minutes ? (time.minutes > 0 ? `${time.minutes}:` : "00") : ""
  }${time.seconds ? (time.seconds > 0 ? `${time.seconds}` : "00") : ""}`;
  str = str.replace(/:\s*$/g, "");

  return str;
}
