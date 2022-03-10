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
  const b = biggest || "months";
  if (b === "months") months = Math.floor(convertedSeconds / (3600 * 24 * 30));
  if (b === "months" || b === "days" || !months)
    days = Math.floor(
      (convertedSeconds - (months || 0) * 3600 * 24 * 30) / (3600 * 24)
    );
  if (b === "months" || b === "days" || b === "hours" || (!months && !days))
    hours = Math.floor(
      ((convertedSeconds - (days || 0) * (3600 * 24)) % (3600 * 24)) / 3600
    );
  if (
    b === "months" ||
    b === "days" ||
    b === "hours" ||
    b === "minutes" ||
    (!months && !days && !hours)
  )
    minutes = Math.floor((convertedSeconds % 3600) / 60);
  if (
    b === "months" ||
    b === "days" ||
    b === "hours" ||
    b === "minutes" ||
    b === "seconds" ||
    (!months && !days && !hours && !minutes)
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
    time.months
      ? time.months > 0
        ? `${padZeroes(time.months)}  ${
            time.months == 1 ? "miesiąc" : "miesięcy"
          } `
        : "00"
      : ""
  }${
    time.days
      ? time.days > 0
        ? `${padZeroes(time.days)} ${time.days == 1 ? "dzień" : "dni"} `
        : "00"
      : ""
  }${time.hours ? (time.hours > 0 ? `${padZeroes(time.hours)}:` : "00") : ""}${
    time.minutes
      ? time.minutes > 0
        ? `${padZeroes(time.minutes)}:`
        : "00"
      : ""
  }${
    time.seconds ? (time.seconds > 0 ? `${padZeroes(time.seconds)}` : "00") : ""
  }`;
  str = str.replace(/:\s*$/g, "");

  return str;
}
