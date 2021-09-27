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
import React from "react";

interface CategoryProps {
  icon: JSX.Element;
  color?: string;
  text: string;
  onClick?: () => void;
}

export const Category: React.FC<CategoryProps> = ({
  icon,
  color,
  text,
  onClick,
}) => {
  return (
    // <Flex>
    <Button
      w="36"
      h="fit-content"
      gridGap="2"
      p="3"
      backgroundColor={color}
      flexDirection="column"
      // _hover={}
    >
      <Box h="20" fontSize="60">
        {icon}
      </Box>
      <Box textTransform="uppercase">{text}</Box>
    </Button>
    // </Flex>

    // <div
    //   className={`${
    //     tailwindBgColor ? tailwindBgColor : "bg-gray-200"
    //   }  flex flex-col justify-around items-center float-left p-3 cursor-pointer categoryIcon w-36 first:rounded-l-md last:rounded-r-md select-none`}
    //   onClick={onClick}
    // >
    //   {/* <FontAwesomeIcon icon={icon} opacity="0.7" size="2x" /> */}
    //   <IconButton icon={icon} aria-label={text} />
    //   <span className="opacity-70 font-semibold uppercase text-lg tracking-wide ">
    //     {text}
    //   </span>
    // </div>
  );
};
export default Category;
