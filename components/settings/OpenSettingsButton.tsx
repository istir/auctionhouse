import { User } from ".prisma/client";
import {
  Box,
  Button,
  ButtonProps,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Settings from ".";

interface OpenSettingsButtonProps {
  user?: User;
  setUser?: (user: User) => void;
}

export default function OpenSettingsButton(
  props: OpenSettingsButtonProps & ButtonProps
): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser, ...otherProps } = props;

  if (!user) return <Box></Box>;
  return (
    <Box>
      <Button onClick={onOpen} {...otherProps}>
        {props.children}
      </Button>
      <Portal>
        <Settings
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          user={user}
          setUser={setUser}
        />
      </Portal>
    </Box>
  );
}
