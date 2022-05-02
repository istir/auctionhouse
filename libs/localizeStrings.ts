export function localizePersonsBought(howMany: number) {
  //1 osoba kupiła
  //2,3,4 osoby kupiło
  //5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20 osób kupiło
  //20-43 osób kupiło

  switch (howMany) {
    case 1:
      return "1 osoba kupiła";
    case 2:
      return "2 osoby kupiło";
    case 3:
      return "3 osoby kupiło";
    case 4:
      return "4 osoby kupiło";

    default:
      return `${howMany} osób kupiło`;
  }
}

export function localizeErrors(errorMessage: string) {
  switch (errorMessage) {
    case "Data doesn't exist":
      return "Nie znaleziono konta o podanych danych logowania. Sprawdź ich poprawność i spróbuj ponownie.";
    case "User not verified":
      return "Konto nie jest zweryfikowane. Przejdź do skrzynki pocztowej i zweryfikuj konto";
    default:
      return errorMessage;
  }
}
