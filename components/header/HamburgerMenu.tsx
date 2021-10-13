import { IconButton } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import React from "react";
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
interface HamburgerMenuProps {
  drawerWidth?: string;
  isDrawerOpen?: boolean;
  onDrawerOpen?: () => void;
  onDrawerClose?: () => void;
}

export default function HamburgerMenu(props: HamburgerMenuProps): JSX.Element {
  // const [hover, setHover] = React.useState<boolean>(false);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const lightMode = useLightModeCheck();
  return (
    <Box>
      <IconButton
        zIndex="5"
        icon={<Hamburger direction="left" size={20} />}
        aria-label="Menu"
        variant="transparent"
        onClick={props.onDrawerOpen}
        // onMouseOver={() => {
        //   setHover(true);
        // }}
        // onMouseLeave={() => setHover(false)}
        m="2"
      />
      {props.isDrawerOpen && props.onDrawerClose ? (
        <Drawer
          isOpen={props.isDrawerOpen}
          placement="left"
          onClose={props.onDrawerClose}
          size={props.drawerWidth}
          // finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody onClick={props.onDrawerClose}>
              <HamburgerOptions />
            </DrawerBody>

            <DrawerFooter>
              <ColorModeSwitcher zIndex="2" text="Zmień motyw" />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : null}
    </Box>
    // <Box zIndex="10" pos="relative">
    //   <Hamburger direction="left" size={20} />
    // </Box>
    // <button
    //   className={styles.hamburger}
    //   style={{ zIndex: 5, position: "relative" }}
    // >
    //   <span className={styles["hamburger-box"]}>
    //     <span className={styles["hamburger-inner"]}></span>
    //   </span>
    // </button>
  );
}
