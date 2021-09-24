// import {
//   faBookmark,
//   faSearch,
//   faShoppingCart,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaBookmark, FaShoppingCart } from "react-icons/fa";
import React from "react";
import SearchComponent from "./SearchComponent";
import { IconButton } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";

interface IconMenuProps {}

export const IconMenu: React.FC<IconMenuProps> = ({}) => {
  const buttonClass = "hover:text-blue-700 cursor-pointer duration-150 ";

  function universalClick(name?: string) {
    console.info("Clicked! " + name);
  }

  return (
    <Flex
      gridGap="2"

      // className="flex gap-2 text-gray-900 transition-colors text-xl justify-self-end items-center"
    >
      {/* ------------------------------- search icon ------------------------------ */}
      {/* <FontAwesomeIcon
        className={buttonClass}
        icon={faSearch}
        onClick={() => {
          universalClick("Search");
        }}
      /> */}
      <SearchComponent renderSearchIcon={true} searchIconClass={buttonClass} />
      {/* ------------------------------ bookmark icon ----------------------------- */}
      {/* <FontAwesomeIcon
        className={buttonClass}
        // icon={faBookmark}
        icon={<FaBookmark />}
        onClick={() => {
          universalClick("Bookmark");
        }}
      />
       */}
      <IconButton
        icon={<FaBookmark />}
        aria-label="Zakładki"
        onClick={() => {
          universalClick("Bookmark");
        }}
      />
      {/* -------------------------------- cart icon ------------------------------- */}
      {/* <FontAwesomeIcon
        className={buttonClass}
        icon={<FaShoppingCart />}
        onClick={() => {
          universalClick("Cart");
        }}
      /> */}
      <IconButton
        icon={<FaShoppingCart />}
        aria-label="Zakładki"
        onClick={() => {
          universalClick("Cart");
        }}
      />
    </Flex>
  );
};
export default IconMenu;
