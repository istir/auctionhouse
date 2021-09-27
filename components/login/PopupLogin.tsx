import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
} from "@chakra-ui/modal";
import { ModalContent, useBreakpoint } from "@chakra-ui/react";
import React from "react";
import Login from "./login";

interface PopupLoginProps {
  refresh: () => void;
  // closePopup: () => void;
  // isModalOpen: boolean;
}

export default function PopupLogin(props: PopupLoginProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  function getSize(currentBreakpoint: string | undefined) {
    // console.log(currentBreakpoint);
    if (undefined) return "md";
    switch (currentBreakpoint) {
      case "base":
        return "full";
      case "sm":
        return "full";
      // case "md":
      //   return "lg";
      default:
        return "lg";
    }
  }
  return (
    <>
      <Button onClick={onOpen}>Zaloguj</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={getSize(useBreakpoint())}
      >
        <ModalOverlay />
        {/* <ModalHeader>Modal Title</ModalHeader> */}
        <ModalContent>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            w="full"
            justifyItems="center"
            alignItems="center"
          >
            <Login refresh={props.refresh} closePopup={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
