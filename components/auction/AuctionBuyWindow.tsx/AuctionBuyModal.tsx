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
  useDisclosure,
} from "@chakra-ui/react";
import { Auction } from "@prisma/client";
import React from "react";
import AuctionMoreFromUser from "./AuctionMoreFromUser";

interface AuctionBuyModalProps {
  children: React.ReactNode;
  auction: Auction;
}

export default function AuctionBuyModal(
  props: AuctionBuyModalProps
): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
          onClick: onOpen,
        });
      })}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.auction.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              Dodano do koszyka, czy chcesz cośtamcośtam
              <AuctionMoreFromUser userId={props.auction.sellerId} />
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
