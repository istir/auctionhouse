import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  Flex,
  ModalContent,
  Text,
  useBreakpoint,
  useColorModeValue,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import Login from "./login";
import Register from "./register";

interface PopupLoginProps {
  refresh?: () => void;
  setUser?: (user: User | undefined) => void;
  dontRenderIcon?: boolean;
  text?: string;
  buttonSize?: "sm" | "lg" | "md" | "xs";

  buttonColorScheme?:
    | "teal"
    | "whiteAlpha"
    | "blackAlpha"
    | "gray"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "cyan"
    | "purple"
    | "pink"
    | "linkedin"
    | "facebook"
    | "messenger"
    | "whatsapp"
    | "twitter"
    | "telegram";
  // closePopup: () => void;
  // isModalOpen: boolean;
}

export default function PopupLogin(props: PopupLoginProps): JSX.Element {
  const [type, setType] = React.useState<"login" | "register">("login");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState<boolean>(false);
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
      <Button
        onClick={onOpen}
        size={props.buttonSize || "md"}
        // colorScheme={props.buttonColorScheme}
        bg={useColorModeValue(
          "light.primaryContainer",
          "dark.primaryContainer"
        )}
        _hover={{
          backgroundColor: useColorModeValue(
            "light.tertiaryContainer",
            "dark.tertiaryContainer"
          ),
        }}
        isLoading={loading}
      >
        <Flex flexDir={"row"} justifyContent="center" alignItems={"center"}>
          {props.dontRenderIcon || <FaSignInAlt />}
          <Text ml={props.dontRenderIcon ? "0" : "2"}>
            {props.text || "Zaloguj się"}
          </Text>
        </Flex>
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={getSize(useBreakpoint())}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton zIndex={"999"} />
          <ModalHeader>
            {type === "login" ? "Logowanie" : "Rejestracja"}
          </ModalHeader>
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
              <Login
                refresh={props.refresh}
                closePopup={onClose}
                setLoading={setLoading}
                setUser={props.setUser}
              />
            ) : (
              <Register
                refresh={props.refresh}
                closePopup={onClose}
                setLoading={setLoading}
              />
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
                // bg={useColorModeValue(
                //   "light.secondaryContainer",
                //   "dark.secondaryContainer"
                // )}
                // _hover={{
                //   backgroundColor: useColorModeValue(
                //     "light.tertiaryContainer",
                //     "dark.tertiaryContainer"
                //   ),
                // }}
                variant={"ghost"}
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
