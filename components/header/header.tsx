import React from "react";
import Image from "next/image";
import IconMenu from "./IconMenu";
import NameMenu from "./NameMenu";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  function drawLogo(imgName?: string): JSX.Element {
    if (imgName) return <Image src="/../public/imgName" />;
    return <Image width="100px" height="30px" src="/../public/vercel.svg" />;
  }

  return (
    <header className="grid sticky bg-gray-200 dark:bg-gray-700 min-w-full min-h-full p-1 h-12 md:h-16 items-center">
      {drawLogo()}
      <IconMenu />
      <NameMenu />
    </header>
  );
};
export default Header;
