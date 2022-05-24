import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchComponentProps {
  paddingX?: string;
}

export default function SearchComponent(
  props: SearchComponentProps
): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = React.useState<string>("");
  const router = useRouter();

  function sendSearch() {
    router.push("/search?q=" + search);
    // console.log(search);
  }

  return (
    <>
      <Box display={{ base: "flex", md: "none" }} paddingX={props.paddingX}>
        <IconButton
          m="0"
          p="0"
          aria-label="Szukaj"
          borderRadius={"full"}
          icon={<FaSearch />}
          size="sm"
          backgroundColor={useColorModeValue(
            "light.surfaceVariant",
            "dark.surfaceVariant"
          )}
          borderColor={useColorModeValue(
            "light.surfaceVariant",
            "dark.surfaceVariant"
          )}
          onClick={onOpen}
        />
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setSearch("");
            onClose();
          }}
        >
          <ModalOverlay />
          <ModalContent
            bg={useColorModeValue("light.primary3", "dark.primary3")}
          >
            <ModalHeader>Szukaj</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Input
                  value={search}
                  placeholder="Czego szukasz?"
                  variant={"outline"}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  type="search"
                  // on
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendSearch();
                    }
                  }}
                  onSubmit={sendSearch}
                ></Input>
                <Button
                  mt="2"
                  width={"full"}
                  bg={useColorModeValue(
                    "light.primaryContainer",
                    "dark.primaryContainer"
                  )}
                  color={useColorModeValue(
                    "light.onPrimaryContainer",
                    "dark.onPrimaryContainer"
                  )}
                  onClick={sendSearch}
                >
                  Szukaj
                </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
      {/* desktop */}
      <Box display={{ base: "none", md: "flex" }} paddingX={props.paddingX}>
        <InputGroup
          size="sm"
          border="2px"
          borderRadius={"full"}
          borderColor={useColorModeValue(
            "light.surfaceVariant",
            "dark.surfaceVariant"
          )}
          overflow="hidden"
          _focusWithin={{
            boxShadow: "0 0 0 3px var(--chakra-colors-gray-200);",
          }}
          transitionDuration="normal"
        >
          <Input
            size="sm"
            border="0"
            width={"40vw"}
            placeholder="Czego szukasz?"
            _focus={{
              border: "0px",
            }}
            value={search}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendSearch();
              }
            }}
            onSubmit={sendSearch}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></Input>

          <InputRightAddon m="0" p="0" border="0" background="transparent">
            <IconButton
              m="0"
              p="0"
              size="sm"
              aria-label="Szukaj"
              icon={<FaSearch />}
              backgroundColor={useColorModeValue(
                "light.surfaceVariant",
                "dark.surfaceVariant"
              )}
              borderLeftRadius="full"
              onClick={() => {
                sendSearch();
              }}
            />
          </InputRightAddon>
        </InputGroup>
      </Box>
    </>
  );
}
