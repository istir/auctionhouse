import { Box, VStack } from "@chakra-ui/layout";
import React from "react";
import ColorModeSwitcher from "../ColorModeSwitcher";
import LogoutButton from "../login/LogoutButton";
import PopupLogin from "../login/PopupLogin";

interface HamburgerOptionsProps {
  refresh?: () => void;
  loggedIn: boolean;
}

export default function HamburgerOptions(
  props: HamburgerOptionsProps
): JSX.Element {
  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <VStack justifyContent="center" alignItems="center">
        <ColorModeSwitcher />
        {/* <Box onClick={}>Zaloguj się</Box> */}
        {props.loggedIn ? (
          <LogoutButton refresh={props.refresh} />
        ) : (
          <PopupLogin refresh={props.refresh} />
        )}
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
      </VStack>
    </Box>
  );
}
