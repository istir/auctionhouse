import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Auction, Bid, Category, User } from "@prisma/client";
import axios from "axios";
import React from "react";

interface AuctionBidProps {
  auction: Auction & {
    category: Category;
    seller: User;
    buyer: User | null;
    bids: Bid[];
  };
}

export default function AuctionBid(props: AuctionBidProps): JSX.Element {
  const [error, setError] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>(getCurrentPrice() + 10);
  const [currentPrice, setCurrentPrice] = React.useState<number>(
    getCurrentPrice()
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sending, setSending] = React.useState<boolean>(false);
  function getCurrentPrice() {
    if (
      props.auction.bids.length > 0 &&
      props.auction.bids[props.auction.bids.length - 1].offer >
        props.auction.price
    )
      return props.auction.bids[props.auction.bids.length - 1].offer;
    return props.auction.price;
  }

  async function sendBid() {
    if (price < currentPrice) return onClose();
    setSending(true);
    // const test = { auctionId: props.auction.id, offer: price };
    // console.log(test);
    axios({
      method: "POST",
      url: "/api/sendBid",
      data: { auctionId: props.auction.id, offer: price },
    }).then((ful) => {
      setSending(false);
      onClose();
      setCurrentPrice(price);
    });
  }

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Zalicytować?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Anulowanie oferty jest niemożliwe. Czy na pewno chcesz potwierdzić
            ofertę {price} zł za {props.auction.name}?
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent="space-between">
            <Button colorScheme={"blue"} onClick={onClose}>
              Nie, zmieniłem zdanie
            </Button>
            <Button colorScheme={"red"} isLoading={sending} onClick={sendBid}>
              Tak, potwierdzam ofertę
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box>
        Aktualna cena: {currentPrice}
        zł
      </Box>
      <Box>
        Oferta:
        <Input
          defaultValue={currentPrice + 10}
          onChange={(e) => {
            setPrice(parseInt(e.target.value));
          }}
        />
        <Button
          onClick={() => {
            setError("");
            if (price < currentPrice) return setError("Zbyt niska oferta.");
            onOpen();
          }}
        >
          Licytuj
        </Button>
        <Text color="red.200">{error}</Text>
      </Box>
    </Box>
  );
}
