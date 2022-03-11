import { FaBookmark, FaShoppingCart } from "react-icons/fa";
import React, { useContext } from "react";
import SearchComponent from "./SearchComponent";
import { IconButton } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import useColorSchemeContext from "../../libs/hooks/useColorSchemeContext";
import useLightModeCheck from "../../libs/hooks/useLightModeCheck";
import ColorModeSwitcher from "../ColorModeSwitcher";
import { useRouter } from "next/router";

export default function IconMenu(): JSX.Element {
  const buttonClass = "hover:text-blue-700 cursor-pointer duration-150 ";
  const router = useRouter();
  const { color } = useContext(useColorSchemeContext);
  const lightMode = useLightModeCheck();
  function universalClick(name?: string) {
    console.info("Clicked! " + name);
  }

  return (
    <Flex
      gridGap="2"
      color={lightMode ? `${color}.900` : `${color}.200`}
      transition="color"
      fontSize="xl"
      justifySelf="end"
      alignItems="center" //albo justify??
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
      <ColorModeSwitcher />

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
          // universalClick("Cart");
          //TODO: open cart modal or popover
          router.replace("/cart");
        }}
      />
    </Flex>
  );
}
