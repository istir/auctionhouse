import { Box, Flex, MenuItem, MenuList } from "@chakra-ui/react";
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

interface UserMenuOptionsProps {
  refresh?: () => void;
  setUser?: (user: User | undefined) => void;
  setLoading?: (loading: boolean) => void;
}

export default function UserMenuOptions(
  props: UserMenuOptionsProps
): JSX.Element {
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
      onClick: () => {
        // router.push("/my-auctions");
      },
      // href: "/my-auctions",
      href: "#",
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
    <MenuList zIndex={100}>
      {items.map((item) =>
        item.href ? (
          <MenuItem
            cursor={"pointer"}
            key={item.name}
            // onClick={item.onClick}
            //   as={item.href ? "a" : "button"}
            as={"a"}
            //   href={item.href}
          >
            <Flex align={"center"}>
              <Box mr="2">{item.icon}</Box>
              {item.name}
            </Flex>
          </MenuItem>
        ) : (
          <MenuItem
            cursor={"pointer"}
            key={item.name}
            onClick={item.onClick}
            //   as={item.href ? "a" : "button"}
            //   as={"a"}
            //   href={item.href}
          >
            <Flex align={"center"}>
              <Box mr="2">{item.icon}</Box>
              {item.name}
            </Flex>
          </MenuItem>
        )
      )}
    </MenuList>
  );
}
