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
import { Portal } from "@chakra-ui/portal";
import { Slide } from "@chakra-ui/transition";
interface HamburgerMenuProps {
  drawerWidth?: string;
  isDrawerOpen?: boolean;
  onDrawerOpen?: () => void;
  onDrawerClose?: () => void;
}

export default function HamburgerMenu(props: HamburgerMenuProps): JSX.Element {
  // const [hover, setHover] = React.useState<boolean>(false);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [drawerPercentage, setDrawerPercentage] = React.useState<number>(0);
  const scrollContainer = document.querySelector(
    "#everything-container"
  ) as HTMLElement;
  // body?.style.transform="translateX(50%)"
  // function handleScrolling(percentage:number) {

  // }
  function modifyScroll(percentage: number) {
    if (scrollContainer) {
      scrollContainer.style.transform = `translateX(${percentage}%)`;
    }
  }
  const lightMode = useLightModeCheck();
  return (
    <Box>
      <IconButton
        zIndex="5"
        icon={<Hamburger direction="left" size={20} />}
        aria-label="Menu"
        variant="transparent"
        onClick={() => {
          if (props.isDrawerOpen) {
            props.onDrawerClose?.();
            setDrawerPercentage(80);
            modifyScroll(80);
            return;
          }
          props.onDrawerOpen?.();
          setDrawerPercentage(0);
          modifyScroll(0);
          // props.isDrawerOpen ? props.onDrawerClose?.() : props.onDrawerOpen?.();
        }}
        // onMouseOver={() => {
        //   setHover(true);
        // }}
        // onMouseLeave={() => setHover(false)}
        m="2"
      />

      <Portal>
        <Box
          pos="fixed"
          left="0"
          top="50px"
          w="80vw"
          h="100vh"
          zIndex="10"
          bg="twitter.500"
          transition="0.3s"
          transform={`translateX(${-100 + drawerPercentage}%)`}
        >
          a
        </Box>
      </Portal>
      {/**</Box>// <Drawer
             //TODO: instead of using Drawer maybe either create something from scratch
      that responds to drag (or more like onTouchMove) and also it moves the
      whole website to the side (like twitter for ios), or something that drops
      from top and doesn't obstruct the whole view.
      //   isOpen={props.isDrawerOpen}
      //   placement="left"
      //   onClose={props.onDrawerClose}
      //   size={props.drawerWidth}

      //   // transform="translateX(-50%)"
      //   // finalFocusRef={btnRef}
      // >
    
      //   <DrawerContent
      //     onTouchMove={() => {
      //       console.log("drag");
      //     }}
      //   >
      //     <DrawerCloseButton />

      //     <DrawerBody onClick={props.onDrawerClose}>
      //       <HamburgerOptions />
      //     </DrawerBody>

      //     <DrawerFooter>
      //       <ColorModeSwitcher zIndex="2" text="Zmień motyw" />
      //     </DrawerFooter>
      //   </DrawerContent>
     // </Drawer>*/}
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
