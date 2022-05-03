import * as React from "react";
import {
  Button,
  IconButtonProps,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label"> & {
  text?: string;
  renderBg?: boolean;
  colorScheme?: string;
};

export default function ColorModeSwitcher(props: ColorModeSwitcherProps) {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Button
      size="md"
      variant={props.renderBg ? "solid" : "transparent"}
      colorScheme={props.colorScheme ? props.colorScheme : "blue"}
      color="current"
      onClick={toggleColorMode}
      aria-label={`Switch to ${text} mode`}
      {...props}
      justifyContent="center"
      alignItems="center"
    >
      {props.text && <Text mr="2">{props.text}</Text>}
      <SwitchIcon />
    </Button>
  );
}
