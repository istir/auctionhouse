import { Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
import useColorSchemeContext from "../../libs/hooks/useColorSchemeContext";
import useLightModeCheck from "../../libs/hooks/useLightModeCheck";

interface HeaderUserMenuItemProps {
  onClick: () => void;
  icon?: JSX.Element;
  name: string;
}

export default function HeaderUserMenuItem({
  onClick,
  icon,
  name,
}: HeaderUserMenuItemProps): JSX.Element {
  const { color } = useContext(useColorSchemeContext);
  const lightMode = useLightModeCheck();
  return (
    <Flex
      as="li"
      alignItems="center"
      gridGap="1"
      h="10"
      //   px="3"
      // borderTop="2px"
      // borderColor={lightMode ? `${color}.700` : `${color}.200`}
      // _first={{ borderTop: "none" }}
      userSelect="none"
      cursor="pointer"
      transitionDuration="normal"
      margin="2"
      padding="2"
      borderRadius="md"
      shadow="md"
      backgroundColor={
        lightMode
          ? `var(--chakra-colors-${color}-100)`
          : `var(--chakra-colors-${color}-900)`
      }
      _hover={{
        background: lightMode
          ? `var(--chakra-colors-${color}-200)`
          : `var(--chakra-colors-${color}-700)`,
        // transform: "scale(1.02)",
        padding: "var(--chakra-space-4)",
        // height: "var(--chakra-sizes-11)",
      }}
      onClick={onClick}
    >
      {icon}
      {name}
    </Flex>
  );
}
