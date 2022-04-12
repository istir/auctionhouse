import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { User } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import {
  FaBookmark,
  FaCog,
  FaMoon,
  FaPlus,
  FaShoppingCart,
  FaSun,
} from "react-icons/fa";
// import ColorModeSwitcher from "../ColorModeSwitcher";
import LogoutButton from "../login/LogoutButton";
import PopupLogin from "../login/PopupLogin";

interface HamburgerOptionsProps {
  refresh?: () => void;
  loggedIn: boolean;
  currentUser?: User;
}

export default function HamburgerOptions(
  props: HamburgerOptionsProps
): JSX.Element {
  const router = useRouter();
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const text = useColorModeValue("Ciemny motyw", "Jasny motyw");
  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <VStack justifyContent="center" alignItems="center">
        <Text>Witaj, {props.currentUser?.firstName}!</Text>

        <Button
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
        )}
      </VStack>
    </Box>
  );
}
