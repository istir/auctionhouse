import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
} from "@chakra-ui/modal";
import { ModalContent } from "@chakra-ui/react";
import React from "react";
import Login from "./login";

interface PopupLoginProps {
  refresh: () => void;
  // closePopup: () => void;
  // isModalOpen: boolean;
}

export default function PopupLogin(props: PopupLoginProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Zaloguj</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        {/* <ModalHeader>Modal Title</ModalHeader> */}
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Login refresh={props.refresh} closePopup={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
