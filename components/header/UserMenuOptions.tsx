import {
  Box,
  Button,
  MenuItem,
  MenuList,
  Portal,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import {
  FaBookmark,
  FaCog,
  FaPlus,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import NextButton from "../NextButton";
import Settings from "../settings";

interface UserMenuOptionsProps {
  refresh?: () => void;
  setUser?: (user: User | undefined) => void;
  setLoading?: (loading: boolean) => void;
  user?: User;
}

export default function UserMenuOptions(
  props: UserMenuOptionsProps
): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const items = [
    {
      name: "Koszyk",
      onClick: () => {
        router.push("/cart");
      },
      href: "/cart",
      icon: <FaShoppingCart />,
    },
    {
      name: "Moje licytacje",
      onClick: () => {
        router.push("/my-auctions");
      },
      href: "/my-auctions",
      icon: <FaBookmark />,
    },
    {
      name: "Dodaj przedmiot",
      onClick: () => {
        router.push("/add-auction");
      },
      href: "/add-auction",
      icon: <FaPlus />,
    },
    {
      name: "Ustawienia",
      onClick: onOpen,
      // href: "/my-auctions",
      href: "#",

      // component: (
      //   <OpenSettingsButton
      //     key={"Ustawienia"}
      //     w="full"
      //     m="0"
      //     p="0"
      //     paddingInlineEnd={"0"}
      //     paddingInlineStart="0"
      //     variant={"ghost"}
      //     user={props.user}
      //     setUser={props.setUser}
      //   >
      //     <Box mr="2">
      //       <FaCog />
      //     </Box>
      //     Ustawienia
      //   </OpenSettingsButton>
      // ),
      icon: <FaCog />,
    },
    {
      name: "Wyloguj się",
      onClick: () => {
        props.setLoading?.(true);
        axios.post("/api/logout").then(() => {
          props.setLoading?.(false);
          // router.reload();

          props.setUser ? props.setUser(undefined) : props.refresh?.();
          // props.refresh?.();
        });
      },
      // href: "/my-auctions",
      href: "",
      icon: <FaSignOutAlt />,
    },
  ];

  return (
    <>
      <MenuList
        zIndex={"modal"}
        bg={useColorModeValue("light.primary4", "dark.primary4")}
      >
        {items.map((item) =>
          item.href && item.href !== "#" ? (
            <MenuItem
              // cursor={"pointer"}
              key={item.name}
              margin={"0"}
              padding="0"
              // onClick={item.onClick}
              //   as={item.href ? "a" : "button"}

              //   href={item.href}
            >
              <NextButton
                href={item.href}
                w="full"
                m="0"
                p="0"
                paddingInlineEnd={"0"}
                paddingInlineStart="0"
                variant={"ghost"}
              >
                <Box mr="2">{item.icon}</Box>
                {item.name}
              </NextButton>
              {/* <NextLink href={item.href} passHref>
              <Button
                w="full"
                m="0"
                p="0"
                paddingInlineEnd={"0"}
                paddingInlineStart="0"
                variant={"ghost"}
              >
                <Box mr="2">{item.icon}</Box>
                {item.name}
              </Button>
            </NextLink> */}
            </MenuItem>
          ) : (
            <MenuItem
              // cursor={"pointer"}
              key={item.name}
              margin={"0"}
              padding="0"
              //   as={item.href ? "a" : "button"}
              //   as={"a"}
              //   href={item.href}
            >
              <Button
                w="full"
                m="0"
                p="0"
                paddingInlineEnd={"0"}
                paddingInlineStart="0"
                variant={"ghost"}
                onClick={item.onClick}
              >
                <Box mr="2">{item.icon}</Box>
                {item.name}
              </Button>
            </MenuItem>
          )
        )}
      </MenuList>
      <Portal>
        {props.user ? (
          <Settings
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            user={props.user}
            setUser={props.setUser}
          />
        ) : null}
      </Portal>
    </>
  );
}
