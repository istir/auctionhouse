export default function padWithZeroes(number: number | string) {
  let n = number || "0";
  if (n < 10) return `0${n}`;
  return n;
}
