import { Button, IconButton } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useRef } from "react";
import useLightModeCheck from "../../libs/hooks/useLightModeCheck";
import { Spin as Hamburger } from "hamburger-react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
} from "@chakra-ui/modal";
import HamburgerOptions from "./HamburgerOptions";
import ColorModeSwitcher from "../ColorModeSwitcher";
import { Portal } from "@chakra-ui/portal";
import { Slide } from "@chakra-ui/transition";
import { User } from ".prisma/client";
import { Image } from "@chakra-ui/image";
interface HamburgerMenuProps {
  user?: User;
  drawerWidth?: string;
  isDrawerOpen?: boolean;
  onDrawerOpen?: () => void;
  onDrawerClose?: () => void;
}

export default function HamburgerMenu(props: HamburgerMenuProps): JSX.Element {
  const headerRef = useRef<HTMLDivElement>(null);

  function drawDrawer() {
    if (props.isDrawerOpen && props.onDrawerClose) {
      return (
        <Drawer
          isOpen={props.isDrawerOpen}
          placement="top"
          onClose={props.onDrawerClose}
          // size={props.drawerWidth}
        >
          <DrawerContent
            mt={`${
              headerRef?.current?.clientHeight
                ? headerRef?.current?.clientHeight - 3
                : 0
            }px`}
          >
            <DrawerBody onClick={props.onDrawerClose}>
              <HamburgerOptions />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      );
    }
  }
  function drawName() {
    if (!props.user) return;
    function renderSellerAvatar() {
      if (!props.user) return;
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
      <Button variant="pill" minH="fit-content">
        {renderSellerAvatar()}
        <Text ml="2">{`${props.user.firstName} ${props.user.lastName}`}</Text>
      </Button>
    );
  }
  const lightMode = useLightModeCheck();
  return (
    <Flex ref={headerRef}>
      <IconButton
        zIndex="5"
        icon={
          <Hamburger
            direction="left"
            size={20}
            toggled={props.isDrawerOpen}
            // toggled={drawerPercentage > 0}
          />
        }
        aria-label="Menu"
        variant="transparent"
        pointerEvents="all"
        onClick={props.onDrawerOpen}
        // onClick={() => {
        //   console.log();
        // }}
        m="2"
      />
      {drawDrawer()}
      {drawName()}
    </Flex>
  );
}
