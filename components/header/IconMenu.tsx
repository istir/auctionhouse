import {
  faBookmark,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IconMenuProps {}

export const IconMenu: React.FC<IconMenuProps> = ({}) => {
  const buttonClass = " hover:text-blue-900 cursor-pointer duration-150 ";

  function universalClick(name?: string) {
    console.info("Clicked! " + name);
  }

  return (
    <nav className="flex gap-2 text-gray-900 transition-colors text-xl justify-self-end">
      {/* ------------------------------- search icon ------------------------------ */}
      <FontAwesomeIcon
        className={buttonClass}
        icon={faSearch}
        onClick={() => {
          universalClick("Search");
        }}
      />
      {/* ------------------------------ bookmark icon ----------------------------- */}
      <FontAwesomeIcon
        className={buttonClass}
        icon={faBookmark}
        onClick={() => {
          universalClick("Bookmark");
        }}
      />
      {/* -------------------------------- cart icon ------------------------------- */}
      <FontAwesomeIcon
        className={buttonClass}
        icon={faShoppingCart}
        onClick={() => {
          universalClick("Cart");
        }}
      />
    </nav>
  );
};
export default IconMenu;
