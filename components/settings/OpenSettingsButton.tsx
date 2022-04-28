import { User } from ".prisma/client";
import { Box, Button, ButtonProps, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Settings from ".";

interface OpenSettingsButtonProps {
  user?: User;
}

export default function OpenSettingsButton(
  props: OpenSettingsButtonProps & ButtonProps
): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!props.user) return <Box></Box>;
  return (
    <Box>
      <Button onClick={onOpen} {...props}>
        {props.children}
      </Button>
      <Settings
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        user={props.user}
      />
    </Box>
  );
}
