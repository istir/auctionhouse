export default function randomSalt(length: number = 8, url?: boolean) {
  const characters = url
    ? `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`
    : `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[{}]\|'";:/?.>,<`;
  let string = "";
  for (let i = 0; i < length; i += 1) {
    string += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return string;
}
