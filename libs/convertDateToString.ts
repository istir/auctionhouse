export default function converTdateToString(date: Date | string): string {
  let correctDate = new Date(date);

  function padZero(number: number): string {
    if (number < 10) return "0" + number;
    return "" + number;
  }
  function correctMonth(month: number): string {
    let cmonth = month + 1;
    // if (cmonth < 10) return "0" + cmonth;
    return padZero(cmonth);
  }

  return `${correctDate.getFullYear()}-${correctMonth(
    correctDate.getMonth()
  )}-${padZero(correctDate.getDate())}T${padZero(
    correctDate.getHours()
  )}:${padZero(correctDate.getMinutes())}`;
}
