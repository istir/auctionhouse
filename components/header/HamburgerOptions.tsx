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
import { useRouter } from "next/router";
import React from "react";
import { FaMoon, FaSun, FaThLarge } from "react-icons/fa";
// import ColorModeSwitcher from "../ColorModeSwitcher";
import NextLink from "next/link";
interface HamburgerOptionsProps {
  refresh?: () => void;
  loggedIn: boolean;
  currentUser?: User;
  renderAsButtons?: boolean;
}

export default function HamburgerOptions(
  props: HamburgerOptionsProps
): JSX.Element {
  const router = useRouter();
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const text = useColorModeValue("Ciemny motyw", "Jasny motyw");
  const items = [
    {
      name: "Kategorie",
      onClick: () => {
        // router.push("/cart");
      },
      href: "",
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
        // textDecorationLine={"none"}
        // textDecorationStyle={"none"}
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
            <Flex>
              <Popover trigger="hover">
                <PopoverTrigger>
                  <NextLink key={item.name} href={item.href} passHref>
                    <IconButton
                      // href={item.href}
                      as={Link}
                      size="sm"
                      aria-label={item.name}
                      icon={item.icon}
                      borderRadius="full"
                      // onClick={item.onClick}
                    ></IconButton>
                  </NextLink>
                </PopoverTrigger>
                <PopoverContent width={"max-content"}>
                  <PopoverArrow />
                  <PopoverBody>{item.name}</PopoverBody>
                </PopoverContent>
              </Popover>

              {/* <Button>{item.name}</Button> */}
            </Flex>
          ) : (
            <Flex>
              <Popover trigger="hover">
                <PopoverTrigger>
                  <IconButton
                    size="sm"
                    aria-label={item.name}
                    icon={item.icon}
                    borderRadius="full"
                    onClick={item.onClick}
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
        {/* <Text>Witaj, {props.currentUser?.firstName}!</Text> */}
        <VStack display={"flex"} width="full">
          {items.map((item) =>
            item.href ? (
              <NextLink key={item.name} href={item.href} passHref>
                {renderFlex(item.icon, item.name)}
              </NextLink>
            ) : (
              <Box>{renderFlex(item.icon, item.name, item.onClick)}</Box>
            )
          )}
        </VStack>
        {/* <Button
          as="a"
          href="/cart"
          onClick={() => {
            router.push("/cart");
          }}
        >
          <Flex flexDir={"row"} justifyContent="center" alignItems={"center"}>
            <FaShoppingCart />
            <Text ml="2">Koszyk</Text>
          </Flex>
        </Button>

        <Button
          as="a"
          href="/my-auctions"
          onClick={() => {
            router.push("/cart");
          }}
        >
          <Flex flexDir={"row"} justifyContent="center" alignItems={"center"}>
            <FaBookmark />
            <Text ml="2">Moje licytacje</Text>
          </Flex>
        </Button>
        <Button>
          <Flex flexDir={"row"} justifyContent="center" alignItems={"center"}>
            <FaPlus />
            <Text ml="2">Dodaj przedmiot</Text>
          </Flex>
        </Button>
        <Button onClick={toggleColorMode}>
          <SwitchIcon />
          <Text ml="2">{text}</Text>
        </Button>
        <Button>
          <Flex flexDir={"row"} justifyContent="center" alignItems={"center"}>
            <FaCog />
            <Text ml="2">Ustawienia</Text>
          </Flex>
        </Button>
        {props.loggedIn ? (
          <LogoutButton refresh={props.refresh} />
        ) : (
          <PopupLogin refresh={props.refresh} />
        )} */}
      </VStack>
    </Box>
  );
}
