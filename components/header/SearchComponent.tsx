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
  //on mobile open modal with search bar
  //on desktop use inputgroup to search

  function sendSearch() {
    // axios({
    //   url: "/api/search",
    //   method: "POST",
    //   data: { query: search, desc: true },
    // }).then(
    //   (ful) => {
    //     console.log(ful);
    //     // setSending(false);
    //     // onClose();
    //     // setCurrentPrice(price);
    //   },
    //   (rej) => {
    //     console.log(rej);
    //   }
    // );
    router.push("/search?q=" + search);
    console.log(search);
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
          // onClick={() => {
          //   isOpen ? onOpen() : onClose();
          // }}
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
                  // colorScheme="green"
                  // _focus={useColorModeValue("")}
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

            {/* <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter> */}
          </ModalContent>
        </Modal>
      </Box>
      {/* desktop */}
      <Box display={{ base: "none", md: "flex" }} paddingX={props.paddingX}>
        <InputGroup
          size="sm"
          // border={open ? "1px" : "0px"}
          border="2px"
          borderRadius={"full"}
          borderColor={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
          overflow="hidden"
          // minW="0"
          _focusWithin={{
            boxShadow: "0 0 0 3px var(--chakra-colors-gray-200);",
          }}
          // transition={"0.3s"}
          transitionDuration="normal"
          // width={open ? "48" : "40px"}
        >
          <Input
            size="sm"
            // transition={"0.3s"}
            border="0"
            // width={isOpen ? "48" : "0"}
            // minWidth={"30vw"}
            // maxWidth={"80vw"}
            width={"40vw"}
            // minW="0"
            // padding={0}
            placeholder="Czego szukasz?"
            _focus={{
              border: "0px",
              // backgroundColor: "var(--chakra-colors-whiteAlpha-300)",
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

          <InputRightAddon
            m="0"
            p="0"
            border="0"
            // borderRadius={"md"}
            background="transparent"
          >
            <IconButton
              m="0"
              p="0"
              size="sm"
              aria-label="Szukaj"
              icon={<FaSearch />}
              borderLeftRadius="full"
              onClick={() => {
                // setSearch("");
                // setOpen((prev) => {
                //   return !prev;
                // });
                sendSearch();
              }}
            />
          </InputRightAddon>
        </InputGroup>
      </Box>
    </>
  );
}
