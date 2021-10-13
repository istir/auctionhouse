import { useColorMode } from "@chakra-ui/react";
import { Color } from "../../types";

export default function useColorValue(
  colorScheme: Color,
  shadeIfLight?: string | number,
  shadeIfDark?: string | number
) {
  const { colorMode } = useColorMode();
  if (colorMode === "light") {
    if (shadeIfLight) {
      return `${colorScheme}.${shadeIfLight}`;
    }
  } else {
    if (shadeIfDark) {
      return `${colorScheme}.${shadeIfDark}`;
    }
  }

  return "";
  //   return false;
}
