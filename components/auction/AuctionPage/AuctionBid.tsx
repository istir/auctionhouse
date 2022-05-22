import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Auction, Bid, Category, User } from "@prisma/client";
import axios from "axios";
import React from "react";
import FormMessage from "../../form/FormMessage";
import AuctionTimer from "../AuctionTimer";

interface AuctionBidProps {
  user?: User;
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
  const [currentBidLength, setCurrentBidLength] = React.useState<number>(
    props.auction.bids.length
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sending, setSending] = React.useState<boolean>(false);
  const [auctionended, setAuctionended] = React.useState<boolean>(
    isAuctionEnded()
  );
  const buttonColor = useColorModeValue(
    "light.primaryContainer",
    "dark.primaryContainer"
  );
  function getCurrentPrice() {
    if (
      props.auction.bids.length > 0 &&
      props.auction?.bids[props.auction.bids.length - 1]?.offer >
        props.auction.price
    )
      return props.auction?.bids[props.auction.bids.length - 1]?.offer;
    return props.auction.price;
  }
  function isAuctionEnded() {
    if (
      props.auction?.dateEnd < Date.now().toString() ||
      props.auction?.buyerId !== null
    )
      return true;
    return false;
  }
  async function sendBid() {
    if (price < currentPrice) return onClose();
    if (auctionended) return onClose();
    setSending(true);
    axios({
      method: "POST",
      url: "/api/sendBid",
      data: { auctionId: props.auction.id, offer: price },
    }).then(
      (_ful) => {
        setSending(false);
        onClose();
        setCurrentPrice(price);
        setCurrentBidLength(currentBidLength + 1);
      },
      (_rej) => {
        setSending(false);
        setError("Coś poszło nie tak, spróbuj ponownie");
      }
    );
  }

  return (
    <Box
      backgroundColor={useColorModeValue("light.primary2", "dark.primary2")}
      borderRadius="xl"
      boxShadow={"md"}
      padding="4"
    >
      {auctionended ? (
        <Box>Aukcja zakończona</Box>
      ) : (
        <Box>
          <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Zalicytować?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Anulowanie oferty jest niemożliwe. Czy na pewno chcesz
                potwierdzić ofertę {price} zł za {props.auction.name}?
              </ModalBody>
              <ModalFooter display={"flex"} justifyContent="space-between">
                <Button colorScheme={"blue"} onClick={onClose}>
                  Nie, zmieniłem zdanie
                </Button>
                <Button
                  colorScheme={"red"}
                  isLoading={sending}
                  onClick={sendBid}
                >
                  Tak, potwierdzam ofertę
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <AuctionTimer
            dateToEnd={props.auction.dateEnd}
            onEnd={() => {
              setAuctionended(true);
            }}
          />
          <Flex gap="1">
            <Text>Aktualna cena: </Text>
            <Text fontWeight={"semibold"}>{currentPrice} zł</Text>
          </Flex>
          <Box>
            <Flex gap="1">
              <Text>Aktualna liczba ofert: </Text>
              <Text fontWeight={"semibold"}>{currentBidLength}</Text>
            </Flex>
            <Text>Twoja oferta:</Text>
            <InputGroup>
              <Input
                defaultValue={currentPrice + 10}
                onChange={(e) => {
                  setPrice(parseInt(e.target.value));
                }}
              />
              <InputRightAddon>zł</InputRightAddon>
            </InputGroup>
            <Button
              mt="2"
              w={"full"}
              backgroundColor={buttonColor}
              disabled={
                props.user === undefined ||
                props.user.id === props.auction?.sellerId ||
                props.user.id ===
                  props.auction?.bids[props.auction?.bids?.length - 1]?.userId
              }
              onClick={() => {
                setError("");
                if (price < currentPrice) return setError("Zbyt niska oferta.");
                if (isAuctionEnded()) return setError("Aukcja zakończona.");
                onOpen();
              }}
            >
              Licytuj
            </Button>
            <FormMessage error={error} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
