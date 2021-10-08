// import {
//   IconDefinition,
//   IconName,
//   IconPrefix,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   FontAwesomeIcon,
//   FontAwesomeIconProps,
// } from "@fortawesome/react-fontawesome";
import { Button, IconButton } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import React from "react";
import useLightModeCheck from "../../../libs/hooks/useLightModeCheck";

interface CategoryProps {
  icon: JSX.Element;
  color?: string;
  darkColor?: string;
  text: string;
  small?: boolean;
  onClick?: () => void;
}

export const Category: React.FC<CategoryProps> = ({
  icon,
  color,
  text,
  darkColor,
  small,
  onClick,
}) => {
  const lightMode = useLightModeCheck();
  const bgColor =
    color && darkColor ? (lightMode ? color : darkColor) : color || darkColor;

  function renderBigBox() {
    return (
      <>
        <Box h="20" fontSize={small ? "20" : "60"}>
          {icon}
        </Box>
        <Box textTransform="uppercase">{text}</Box>
      </>
    );
  }
  function renderSmallBox() {
    return (
      <>
        <Box fontSize={small ? "20" : "60"}>{icon}</Box>
        <Box textTransform="uppercase">{text}</Box>
      </>
    );
  }

  return (
    <Button
      w="36"
      h={small ? "10" : "fit-content"}
      gridGap="2"
      p="3"
      backgroundColor={bgColor}
      flexDirection={small ? "row" : "column"}
      shadow="md"
      overflow="hidden"
      _hover={{ filter: "brightness(1.1)", transform: "scale(1.05)" }}
      _active={{ filter: "brightness(1.2)", transform: "scale(1.1)" }}
    >
      {small ? renderSmallBox() : renderBigBox()}
    </Button>
  );
};
export default Category;
