import { Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

interface LogoutButtonProps {
  refresh?: () => void;
  closePopup?: () => void;
}

export default function LogoutButton(props: LogoutButtonProps): JSX.Element {
  return (
    <Button
      onClick={() => {
        axios.post("/api/logout").then(() => {
          // router.reload();
          props.refresh?.();
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
