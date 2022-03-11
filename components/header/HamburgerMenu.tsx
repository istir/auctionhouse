// import { IconButton } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import React, { useRef } from "react";
import useLightModeCheck from "../../libs/hooks/useLightModeCheck";
// import { Spin as Hamburger } from "hamburger-react";
import { Drawer, DrawerBody, DrawerContent } from "@chakra-ui/modal";
import HamburgerOptions from "./HamburgerOptions";
import { User } from ".prisma/client";
import { Image } from "@chakra-ui/image";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/react";
interface HamburgerMenuProps {
  user?: User;
  drawerWidth?: string;
  // isDrawerOpen?: boolean;
  // onDrawerOpen?: () => void;
  // onDrawerClose?: () => void;
  refresh?: () => void;
}

export default function HamburgerMenu(props: HamburgerMenuProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isLightMode = useLightModeCheck();
  function drawDrawer() {
    // if (props.isDrawerOpen && props.onDrawerClose) {
    return (
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        closeOnOverlayClick
        closeOnEsc
        // size={props.drawerWidth}
      >
        <DrawerContent
          mt={`${
            headerRef?.current?.clientHeight
              ? headerRef?.current?.clientHeight - 3
              : 0
          }px`}
        >
          <DrawerBody onClick={onClose}>
            <HamburgerOptions
              currentUser={props.user}
              refresh={props.refresh}
              loggedIn={props.user ? true : false}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
    // }
  }
  function drawName() {
    // if (!props.user) return;
    function renderSellerAvatar() {
      if (!props.user || !props.user.avatar) {
        // if (true) {
        return (
          <Flex
            // src={props.user.avatar}
            // alt={`${props.user.firstName} ${props.user.lastName}`}
            bg={`${isLightMode ? "black" : "white"}`}
            justifyContent={"center"}
            alignItems="center"
            w={["24px", "32px"]}
            h={["24px", "32px"]}
            objectFit="cover"
            borderRadius="full"
            shadow="md"
            overflow={"hidden"}
          >
            <FaUser color={isLightMode ? "white" : "black"} />
          </Flex>
        );
      }

      if (props.user.avatar) {
        return (
          <Image
            src={props.user.avatar}
            alt={`${props.user.firstName} ${props.user.lastName}`}
            w={["24px", "32px"]}
            h={["24px", "32px"]}
            objectFit="cover"
            borderRadius="full"
            shadow="md"
          />
        );
      }
    }

    return (
      // <Button variant="pill" minH="fit-content">
      //   {renderSellerAvatar()}
      //   <Text ml="2">{`${props.user.firstName} ${props.user.lastName}`}</Text>
      // </Button>
      <Flex
        alignItems={"center"}
        justifyContent="center"
        // onClick={() => {
        //   console.log("Open user menu");
        // }}
        onClick={onOpen}
      >
        <Box
          border="3px solid transparent"
          boxShadow={`0 0 0 2px ${isLightMode ? "black" : "white"}`}
          borderRadius="full"
          h="fit-content"
          w="fit-content"
          m="3"
        >
          {renderSellerAvatar()}
        </Box>
      </Flex>
    );
  }
  function drawLogo() {
    return (
      <Flex
        alignItems={"center"}
        justifyItems="center"
        mx="2"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image
          alt="Logo"
          src={isLightMode ? "/Logo-small.png" : "/Logo-light-small.png"}
          h="70%"
        ></Image>
      </Flex>
    );
  }
  const lightMode = useLightModeCheck();
  return (
    <Flex
      ref={headerRef}
      justifyContent={"space-between"}
      h="14"
      alignContent={"center"}
      position="sticky"
      top="0"
    >
      {/* <IconButton
        zIndex="5"
        icon={
          <Hamburger
            direction="left"
            size={20}
            toggled={isOpen}
            // toggled={drawerPercentage > 0}
          />
        }
        aria-label="Menu"
        variant="transparent"
        pointerEvents="all"
        onClick={onOpen}
        // onClick={() => {
        //   console.log();
        // }}
        m="2"
      /> */}
      {/* <Box></Box> */}
      {drawDrawer()}
      {drawLogo()}
      {drawName()}
    </Flex>
  );
}
