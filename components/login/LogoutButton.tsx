import { Button, Flex, Text } from "@chakra-ui/react";
import { User } from "@prisma/client";
import axios from "axios";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

interface LogoutButtonProps {
  refresh?: () => void;
  closePopup?: () => void;
  setUser?: (user: User | undefined) => void;
}

export default function LogoutButton(props: LogoutButtonProps): JSX.Element {
  return (
    <Button
      onClick={() => {
        axios.post("/api/logout").then(() => {
          props?.setUser?.(undefined);
          props?.setUser ? props?.setUser?.(undefined) : props.refresh?.();
          props.closePopup?.();
        });
      }}
    >
      <Flex flexDir={"row"} justifyContent="center" alignItems={"center"}>
        <FaSignOutAlt />
        <Text ml="2">Wyloguj się</Text>
      </Flex>
    </Button>
  );
}
