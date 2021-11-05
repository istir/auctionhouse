import { IconButton } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
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
interface HamburgerMenuProps {
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
          <DrawerContent mt={`${headerRef?.current?.clientHeight}px`}>
            <DrawerCloseButton />

            <DrawerBody onClick={props.onDrawerClose}>
              <HamburgerOptions />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      );
    }
  }
  const lightMode = useLightModeCheck();
  return (
    <Box ref={headerRef}>
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
    </Box>
  );
}
