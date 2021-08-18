export default function ajaxUser(userId: number) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/api/getUser", true);
  xhttp.send(JSON.stringify(userId));
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        console.log(xhttp.responseText);
      }
    }
  };
}
