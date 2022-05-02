/**
 * This function is used to check if email is correct.
 * @param value - email input
 * @returns error message or nothing
 */

export function validateEmail(value: string): void | string {
  if (process.env.NODE_ENV === "development") return;
  if (!value) {
    return "Pole nie może być puste";
  }
  if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value)) {
    return "Niepoprawny email";
  }
  // if(value.search(/\W/)) return ""
}

/**
 * This function is used to check if name is correct (not empty).
 * @param value - name input
 * @returns error message or nothing
 */

export function validateName(value: string): void | string {
  if (process.env.NODE_ENV === "development") return;
  if (!value) {
    return "Pole nie może być puste";
  }

  // if(value.search(/\W/)) return ""
}
export function validatePrice(value: string | number): void | string {
  if (process.env.NODE_ENV === "development") return;
  if (!value) return "Pole nie może być puste";

  if (value < 0) return "Cena nie może być ujemna";
  // if(value.search(/\W/)) return ""

  // if(value.search(/\W/)) return ""
}

/**
 * This method is used to check if password is strong enough.
 * @param {string} value - password input
 * @returns error message or nothing
 */
export function validatePassword(value: string): void | string {
  if (process.env.NODE_ENV === "development") return;
  let error = "Hasło musi zawierać co najmniej";
  let isError = false;
  if (value.length < 8) {
    isError = true;
    error += " 8 znaków,";
  }
  if (value.search(/.*[a-zA-Z]/) < 0) {
    isError = true;
    error += " jedną literę,";
  }
  if (value.search(/.*\d/) < 0) {
    isError = true;
    error += " jedną liczbę,";
  }

  error = error.replace(/,$/, ".");
  error = error.replace(/,([^,]*)$/, " i " + "$1");
  if (isError) return error;
}
export function validateConfirmPassword(
  password: string,
  value: string
): void | string {
  // if (process.env.NODE_ENV === "development") return;
  let error = "";
  if (password && value) {
    if (password !== value) {
      error = "Hasła nie są takie same";
    }
  }
  return error;
}
export function validateUserName(value: string): void | string {
  if (process.env.NODE_ENV === "development") return;
  let error = "Login musi zawierać co najmniej";
  let isError = false;
  if (value.length < 5) {
    isError = true;
    error += " 5 znaków,";
  }
  if (value.search(/.*[a-zA-Z]/) < 0) {
    isError = true;
    error += " jedną literę,";
  }
  if (value.search(/.*\d/) < 0) {
    isError = true;
    error += " jedną liczbę,";
  }

  error = error.replace(/,$/, ".");
  error = error.replace(/,([^,]*)$/, " i " + "$1");
  if (isError) return error;
}

/**
 *
 * @param  value - entered zipcode
 * @returns error message or nothing
 */

export function validateZipCode(value: string): string | void {
  if (process.env.NODE_ENV === "development") return;
  const regexQuery = "^[0-9]{2}-?[0-9]{3}$";
  const regex = new RegExp(regexQuery);
  if (!value) {
    return "Pole nie może być puste";
  }
  if (!regex.test(value)) {
    return "Nieprawidłowy format";
  }
}

/**
 * This function checks if entered value is that of "City 11", "City 11/1", "City 11a/1", "City 11 m. 1". Supports polish characters
 * @param value - entered address
 * @returns error message or nothing
 */
export function validateAddress(value: string): string | void {
  if (process.env.NODE_ENV === "development") return;
  if (!value) {
    return "Pole nie może być puste";
  }
  if (
    !value.match(
      /^((ul|Ul|UL|ULICA|Ulica|ulica)\.? ?)?[a-zżźćńółęąś ]+ [0-9]+[a-z]?($|\/[0-9]+| ?m\.? ?[0-9]+)$/i
    )
  ) {
    return "Nieprawidłowy format";
  }
}

/**
 * This function checks if entered value is +xx xxx xxx xxx, where +xx is optional and the spacing is either empty, - or space
 * @param value - entered phone number
 * @returns error message or nothing
 */
export function validatePhoneNumber(value: string): string | void {
  if (process.env.NODE_ENV === "development") return;
  if (!value) {
    return "Pole nie może być puste";
  }
  if (
    !value.match(
      /^(\+[0-9]{2})?[-\s\\.]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{3}$/
    )
  ) {
    return "Nieprawidłowy format";
  }
}

/**
@param value - entered date
@returns error message or nothing 
*/
export function validateDate(value: string): string | void {
  if (process.env.NODE_ENV === "development") return;
  function isLeapYear(year: string) {
    let yearInt = parseInt(year);
    if (isNaN(yearInt)) return false;
    if ((yearInt % 4 === 0 && yearInt % 100 !== 0) || yearInt % 400 === 0) {
      return true;
    }
    return false;
  }

  function checkIfDayIsPossible(year: string, month: string, day: string) {
    let maxDay;
    switch (month) {
      case "01":
        maxDay = 31;
        break;
      case "03":
        maxDay = 31;
        break;
      case "05":
        maxDay = 31;
        break;
      case "07":
        maxDay = 31;
        break;
      case "08":
        maxDay = 31;
        break;
      case "10":
        maxDay = 31;
        break;
      case "12":
        maxDay = 31;
        break;
      case "02":
        maxDay = isLeapYear(year) ? 29 : 28;
        break;
      default:
        maxDay = 30;
        break;
    }
    if (isNaN(parseInt(day))) return false;
    if (parseInt(day) < 0 || parseInt(day) > maxDay) return false;
    return true;
  }

  if (!value) {
    return "Pole nie może być puste";
  }
  try {
    const [year, month, day] = value.split("-");
    if (
      isNaN(new Date(value).getTime()) ||
      new Date(value).getTime() > Date.now() ||
      year < "1850"
    ) {
      return "Niewłaściwa data";
    }
    if (month < "01" || month > "12") {
      return "Niewłaściwa data";
    }
    if (!checkIfDayIsPossible(year, month, day)) {
      return "Niewłaściwa data";
    }
  } catch (err) {
    console.error(err);
  }
}
