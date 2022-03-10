import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpoint,
  useDisclosure,
} from "@chakra-ui/react";
import { Auction } from "@prisma/client";
import React from "react";
import AuctionMoreFromUser from "./AuctionMoreFromUser";

interface AuctionBuyModalProps {
  children: React.ReactNode;
  auction: Auction;
  onPress: () => void;
}

export default function AuctionBuyModal(
  props: AuctionBuyModalProps
): JSX.Element {
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
  return (
    <>
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
          onClick: () => {
            // console.log("ZAMN1");
            onOpen();

            props.onPress();
          },
        });
      })}

      <Modal isOpen={isOpen} onClose={onClose} size={getSize(useBreakpoint())}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.auction.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              Dodano do koszyka, czy chcesz cośtamcośtam
              <AuctionMoreFromUser userId={props.auction.sellerId} smaller />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
