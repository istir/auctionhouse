import React from "react";
import Image from "next/image";
import IconMenu from "./IconMenu";
import NameMenu from "./NameMenu";
import vercel from "../../public/vercel.svg";
interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  function drawLogo(imgName?: string): JSX.Element {
    if (imgName) return <Image src="/public/imgName" />;
    return <Image width="100px" height="30px" src={vercel} />;
  }

  return (
    <header className=" pl-3 pr-3 md:pl-10 md:pr-10 flex justify-between sticky bg-gray-200 dark:bg-gray-700 min-w-full min-h-full p-1 h-12 md:h-16 items-center shadow-md">
      {drawLogo()}
      <nav className="flex items-center gap-3">
        <IconMenu />
        <NameMenu />
      </nav>
    </header>
  );
};
export default Header;
