import { Box, Flex, HStack, Link, Text, VStack } from "@chakra-ui/layout";
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import React from "react";
import { FaMoon, FaSun, FaThLarge } from "react-icons/fa";
import NextLink from "next/link";
interface HamburgerOptionsProps {
  refresh?: () => void;
  loggedIn: boolean;
  currentUser?: User;
  renderAsButtons?: boolean;
  setUser?: (user: User | undefined) => void;
}

export default function HamburgerOptions(
  props: HamburgerOptionsProps
): JSX.Element {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const { colorMode } = useColorMode();
  const items = [
    {
      name: "Kategorie",
      onClick: () => {},
      href: "/categories",
      icon: <FaThLarge />,
    },
    {
      name: "Zmień motyw",
      onClick: toggleColorMode,
      href: "",
      icon: <SwitchIcon />,
    },
  ];
  function renderFlex(icon: JSX.Element, name: string, onClick?: () => void) {
    return (
      <Flex
        as={Link}
        width="full"
        justify={"center"}
        align="center"
        onClick={onClick}
        textDecoration="none"
        cursor={"pointer"}
        py={2}
      >
        <Box mr="2">{icon}</Box>
        <Text fontSize={"large"} fontWeight="semibold">
          {name}
        </Text>
      </Flex>
    );
  }

  if (props.renderAsButtons)
    return (
      <HStack>
        {items.map((item) =>
          item.href ? (
            <Flex key={item.name}>
              <Popover trigger="hover">
                <PopoverTrigger>
                  <Box>
                    <NextLink key={item.name} href={item.href} passHref>
                      <IconButton
                        as={Link}
                        size="sm"
                        aria-label={item.name}
                        icon={item.icon}
                        borderRadius="full"
                        border={"2px"}
                        borderColor={
                          colorMode === "dark"
                            ? "whiteAlpha.500"
                            : "blackAlpha.500"
                        }
                      ></IconButton>
                    </NextLink>
                  </Box>
                </PopoverTrigger>
                <PopoverContent width={"max-content"}>
                  <PopoverArrow />
                  <PopoverBody>{item.name}</PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
          ) : (
            <Flex key={item.name}>
              <Popover trigger="hover">
                <PopoverTrigger>
                  <IconButton
                    size="sm"
                    aria-label={item.name}
                    icon={item.icon}
                    borderRadius="full"
                    onClick={item.onClick}
                    border={"2px"}
                    borderColor={
                      colorMode === "dark" ? "whiteAlpha.500" : "blackAlpha.500"
                    }
                  ></IconButton>
                </PopoverTrigger>
                <PopoverContent width={"max-content"}>
                  <PopoverArrow />
                  <PopoverBody>{item.name}</PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
          )
        )}
      </HStack>
    );
  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <VStack justifyContent="center" alignItems="center">
        <VStack display={"flex"} width="full">
          {items.map((item) =>
            item.href ? (
              <NextLink key={item.name} href={item.href} passHref>
                {renderFlex(item.icon, item.name)}
              </NextLink>
            ) : (
              <Box key={item.name}>
                {renderFlex(item.icon, item.name, item.onClick)}
              </Box>
            )
          )}
        </VStack>
      </VStack>
    </Box>
  );
}
