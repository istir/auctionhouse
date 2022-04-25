import randomSalt from "./randomSalt";

export default function generateUrl(name: string) {
  if (!name) return;

  let n = name.toLowerCase().slice(0, 30);
  n = n.replace(
    /[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\{\}\]\\\|\'\"\;\:\/\?\.\>\,\<]/g,
    ""
  );
  n = n.replace(/ /g, "-");
  return `${n}-${randomSalt(8, true)}`;
}
