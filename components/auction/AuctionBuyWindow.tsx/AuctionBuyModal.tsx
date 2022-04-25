import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpoint,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Auction, User } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import AuctionMoreFromUser from "./AuctionMoreFromUser";

interface AuctionBuyModalProps {
  children: React.ReactNode;
  auction: Auction;
  seller?: User;
  onPress: () => void;
  inCart: boolean;
}

export default function AuctionBuyModal(
  props: AuctionBuyModalProps
): JSX.Element {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  function getSize(currentBreakpoint: string | undefined) {
    // if (!currentBreakpoint) return "md";
    switch (currentBreakpoint) {
      case "base":
        return "full";
      case "sm":
        return "full";
      case "md":
        return "2xl";
      case "lg":
        return "4xl";
      case "xl":
        return "5xl";
      case "2xl":
        return "6xl";
      default:
        return "6xl";
    }
  }
  // console.log(props.seller);
  return (
    <>
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
          onClick: () => {
            // console.log("ZAMN1");
            if (!props.inCart) onOpen();

            props.onPress();
          },
        });
      })}

      <Modal isOpen={isOpen} onClose={onClose} size={getSize(useBreakpoint())}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.auction.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            backgroundColor={useColorModeValue(
              "light.primary1",
              "dark.primary1"
            )}
          >
            <Box>
              <Text fontWeight={"bold"}>Dodano do koszyka.</Text>
              <Flex my="5" justifyContent={"space-between"}>
                <Button colorScheme="red" onClick={onClose} borderRadius="full">
                  Kontynuuj zakupy
                </Button>
                <Button
                  colorScheme={"blue"}
                  borderRadius="full"
                  onClick={() => {
                    router.push("/cart");
                  }}
                >
                  Idź do koszyka
                </Button>
              </Flex>
              <Box borderTop={"1px solid"} borderColor="blackAlpha.400">
                <Text fontWeight={"bold"} textAlign="center" pt="2">
                  Sprawdź więcej przedmiotów od sprzedawcy
                  {props.seller?.firstName} {props.seller?.lastName}
                </Text>
                <AuctionMoreFromUser userId={props.auction.sellerId} smaller />
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
