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

  const blackOut = document.querySelector(
    "#everything-container-black-out"
  ) as HTMLElement;

  // body?.style.transform="translateX(50%)"
  // function handleScrolling(percentage:number) {

  // }
  let touchStart = { x: undefined, y: undefined } as {
    x: number | undefined;
    y: number | undefined;
  };

  function setTouchStart(x: number, y: number) {
    touchStart = { x: x, y: y };
  }
  function calculateTouchScroll(x: number, y: number) {
    if (touchStart.x) {
      if (touchStart.x - x >= 100) {
        //OK
        // setDrawerPercentage(0);
        modifyScroll(0);
        // modifyScroll(Math.floor(((touchStart.x - x) / window.innerWidth) * 100));
      }
    }
  }
  React.useEffect(() => {
    scrollContainer.addEventListener("touchstart", (e) => {
      modifyScroll(0);
    });
    window.addEventListener("touchstart", (e) => {
      setTouchStart(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      // touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
    });
    window.addEventListener("touchmove", (e) => {
      calculateTouchScroll(
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY
      );
    });
    modifyScroll(0);
    return () => {
      //cleanup - ComponentWillUnmount
    };
  }, []);
  function modifyScroll(percentage: number) {
    if (scrollContainer) {
      if (blackOut) {
        if (percentage < 1) blackOut.style.pointerEvents = "all";
        if (percentage > 1) blackOut.style.pointerEvents = "none";
      }
      setDrawerPercentage(percentage);
      scrollContainer.style.transform = `translateX(${percentage}%)`;
    }
  }
  const lightMode = useLightModeCheck();
  return (
    <Box>
      <IconButton
        zIndex="5"
        icon={
          <Hamburger
            direction="left"
            size={20}
            toggled={drawerPercentage > 0}
          />
        }
        aria-label="Menu"
        variant="transparent"
        pointerEvents="all"
        onClick={() => {
          console.log(props.isDrawerOpen);
          if (!props.isDrawerOpen) {
            props.onDrawerClose?.();
            // setDrawerPercentage(80);
            modifyScroll(80);
            return;
          } else {
            props.onDrawerOpen?.();
            // setDrawerPercentage(0);
            modifyScroll(0);
          }
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
          w="100vw"
          h="100vh"
          zIndex="-1"
          bg="twitter.500"
          transition="0.3s"
          transform={`translateX(${-80 + drawerPercentage}%)`}
          padding="10"
          // onTouchStart
          // onTouchMove={(e) => {
          //   console.log(e);
          // }}
        >
          <HamburgerOptions />
          <ColorModeSwitcher zIndex="2" text="Zmień motyw" />
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
