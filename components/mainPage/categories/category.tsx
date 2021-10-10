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
import {
  Box,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import React from "react";
import useLightModeCheck from "../../../libs/hooks/useLightModeCheck";
import CategoryTree from "./CategoryTree";

interface CategoryProps {
  icon: JSX.Element;
  color?: string;
  darkColor?: string;
  text: string;
  small?: boolean;
  categoryId?: number;
  onClick?: () => void;
}

export const Category: React.FC<CategoryProps> = ({
  icon,
  color,
  text,
  darkColor,
  small,
  categoryId,
  onClick,
}) => {
  const [popoverOpen, setPopoverOpen] = React.useState<boolean>(false);
  const [mouseOverPopover, setMouseOverPopover] =
    React.useState<boolean>(false);
  const closePopover = () => setPopoverOpen(false);
  const openPopover = () => setPopoverOpen(true);
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
        {/* {renderCategoryTree()} */}
      </>
    );
  }
  function renderCategoryTree() {
    return (
      <Popover
        isLazy
        isOpen={popoverOpen || mouseOverPopover}
        //false || true -> open
        //true || false -> open
        // false || false -> close
        onClose={closePopover}
        // placement="right"
        closeOnBlur={false}
        returnFocusOnClose={false}
      >
        <PopoverTrigger>{renderButton()}</PopoverTrigger>
        <Portal>
          <PopoverContent
            mt="-2"
            pt="2"
            onMouseLeave={() => {
              setMouseOverPopover(false);
            }}
            onMouseOver={() => {
              setMouseOverPopover(true);
            }}
          >
            {/* <PopoverArrow /> */}

            <PopoverBody>
              <CategoryTree categoryId={categoryId} />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    );
  }

  function renderButton() {
    return (
      <Button
        w="36"
        h={small ? "10" : "fit-content"}
        gridGap="2"
        p="3"
        backgroundColor={bgColor}
        flexDirection={small ? "row" : "column"}
        shadow="md"
        // onClick={openPopover}
        onMouseOver={openPopover}
        onMouseLeave={closePopover}
        overflow="hidden"
        _hover={{ filter: "brightness(1.1)" }}
        _active={{ filter: "brightness(1.2)" }}
      >
        {/* {!small ? renderBigBox() : null} */}
        {small ? renderSmallBox() : renderBigBox()}
      </Button>
    );
  }
  if (small) {
    return renderCategoryTree();
  } else {
    return renderButton();
  }
};
export default Category;
