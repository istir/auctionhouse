import randomSalt from "./randomSalt";

export default function generateUrl(name: string) {
  if (!name) return;
  let n = name.toLowerCase();
  n = n.replace(/ /g, "-");
  n = n.replace(
    /[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\{\}\]\\\|\'\"\;\:\/\?\.\>\,\<]/g,
    ""
  );
  return `${n}-${randomSalt(8, true)}`;
}
