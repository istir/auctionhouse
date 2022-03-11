import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Flex, ModalContent, Text, useBreakpoint } from "@chakra-ui/react";
import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import Login from "./login";
import Register from "./register";

interface PopupLoginProps {
  refresh?: () => void;
  // closePopup: () => void;
  // isModalOpen: boolean;
}

export default function PopupLogin(props: PopupLoginProps): JSX.Element {
  const [type, setType] = React.useState<"login" | "register">("login");
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
      <Button onClick={onOpen}>
        <Flex flexDir={"row"} justifyContent="center" alignItems={"center"}>
          <FaSignInAlt />
          <Text ml="2">Zaloguj się</Text>
        </Flex>
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={getSize(useBreakpoint())}
      >
        <ModalOverlay />
        {/* <ModalHeader>Modal Title</ModalHeader> */}
        <ModalContent>
          <ModalCloseButton zIndex={"999"} position="fixed" />
          <ModalBody
            display="flex"
            w="full"
            // overflow={"hidden"}
            // maxH={"90vh"}
            // mt="20"
            justifyItems="center"
            alignItems="center"
            justifyContent={"center"}
            flexDir="column"
          >
            {type === "login" ? (
              <Login refresh={props.refresh} closePopup={onClose} />
            ) : (
              <Register refresh={props.refresh} closePopup={onClose} />
            )}
            <Flex
              justifyContent={"center"}
              alignItems="center"
              flexDir={"column"}
              mt="10"
            >
              <Text>
                {type === "login" ? "Nie masz konta?" : "Masz już konto?"}
              </Text>
              <Button
                colorScheme={"green"}
                onClick={() => {
                  setType((prevType) => {
                    return prevType === "login" ? "register" : "login";
                  });
                }}
              >
                {type === "login" ? "Zarejestruj się!" : "Zaloguj się!"}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
