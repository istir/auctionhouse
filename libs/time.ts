import { RemainingTime } from "../types";

export function convertMillisecondsToTime(
  milliseconds: number,
  biggest?: "months" | "days" | "hours" | "minutes" | "seconds"
): RemainingTime {
  const convertedSeconds = Math.floor(milliseconds / 1000);
  let months;
  let days;
  let hours;
  let minutes;
  let seconds;
  if (biggest === "months")
    months = Math.floor(convertedSeconds / (3600 * 24 * 30));
  if (biggest === "months" || biggest === "days")
    days = Math.floor(convertedSeconds / (3600 * 24));
  if (biggest === "months" || biggest === "days" || biggest === "hours")
    hours = Math.floor((convertedSeconds % (3600 * 24)) / 3600);
  if (
    biggest === "months" ||
    biggest === "days" ||
    biggest === "hours" ||
    biggest === "minutes"
  )
    minutes = Math.floor((convertedSeconds % 3600) / 60);
  if (
    biggest === "months" ||
    biggest === "days" ||
    biggest === "hours" ||
    biggest === "minutes" ||
    biggest === "seconds"
  )
    seconds = Math.floor(convertedSeconds % 60);
  // return `${months > 0 ? `${months} miesiąc ` : " "}${
  //   days > 0 ? `${days} dni` : " "
  // }${hours > 0 ? `${hours} godzin` : " "}${
  //   minutes > 0 ? `${minutes} minut` : " "
  // }${seconds > 0 ? `${seconds} sekund` : " "}`;
  return { months, days, hours, minutes, seconds };
}

export function formatTime(time: RemainingTime) {
  function padZeroes(number: number) {
    if (number < 10) return "0" + number;
    return number + "";
  }
  let str = `${
    time.months ? (time.months > 0 ? `${padZeroes(time.months)}:` : "00") : ""
  }${time.days ? (time.days > 0 ? `${padZeroes(time.days)}:` : "00") : ""}${
    time.hours ? (time.hours > 0 ? `${padZeroes(time.hours)}:` : "00") : ""
  }${
    time.minutes
      ? time.minutes > 0
        ? `${padZeroes(time.minutes)}:`
        : "00"
      : ""
  }${
    time.seconds
      ? time.seconds > 0
        ? `${padZeroes(time.seconds)}`
        : "00"
      : "00"
  }`;
  str = str.replace(/:\s*$/g, "");

  return str;
}
