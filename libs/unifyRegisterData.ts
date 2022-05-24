export default function unifyRegisterData({
  street,
  phoneNumber,
  zipCode,
  birthDate,
}: {
  street: any;
  phoneNumber: any;
  zipCode: any;
  birthDate: any;
}) {
  const s = street
    .replace(/^((ul|ulica)\.? ?)?\b/i, "")
    .replace(/ ?m.? ?/, "/")
    .replace(/\w\S*/g, (w: string) => w.replace(/^\w/, (c) => c.toUpperCase()))
    .trim(); //* replace ul|ulica case insensitive with nothing, then m. to / and then capitalize first letter of word
  let p = phoneNumber.replace(/ /g, "").trim(); //* replace spaces with nothing
  p = p.replace(/-/g, ""); //* replace - with nothing
  let z = parseInt(zipCode.toString().replace("-", "").trim()); //* replace - with nothing

  if (process.env.NODE_ENV === "development") {
    z = 12345;
  }

  let birthDateAsDateObject = birthDate !== "" ? new Date(birthDate) : "";
  if (process.env.NODE_ENV === "development" && birthDateAsDateObject === "") {
    birthDateAsDateObject = new Date();
  }
  return {
    street: s,
    phoneNumber: p,
    zipCode: z,
    birthDate: birthDateAsDateObject,
  };
}
