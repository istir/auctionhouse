function auctionNameToUrl(name: string, auctionId: number) {
  let url = name;
  function replacePolishCharacters() {
    url = url.replace(/ś/gi, "s");
    url = url.replace(/ą/gi, "a");
    url = url.replace(/ę/gi, "e");
    url = url.replace(/ó/gi, "o");
    url = url.replace(/ł/gi, "l");
    url = url.replace(/ń/gi, "n");
    url = url.replace(/ć/gi, "c");
    url = url.replace(/ż/gi, "z");
    url = url.replace(/ź/gi, "z");
  }
  function replaceDigits() {
    url = url.replace(/\d/g, "-");
  }
  function replaceNonWords() {
    url = url.replace(/\W/g, "-");
  }
  function removeUselessSpaces() {
    url = url.replace(/-{2,}/g, "-");
  }
  function removeTrailingSpaces() {
    url = url.replace(/-+$/g, "");
  }
  function addAuctionId() {
    url = url + "-" + auctionId;
  }
  function sliceTooMuchCharacters(howMany: number) {
    url = url.slice(0, howMany);
  }
  function lowercase() {
    url = url.toLowerCase();
  }
  replacePolishCharacters();
  replaceDigits();
  replaceNonWords();
  removeUselessSpaces();
  removeTrailingSpaces();
  sliceTooMuchCharacters(150);

  addAuctionId();
  removeTrailingSpaces();
  lowercase();
  return url;
}
