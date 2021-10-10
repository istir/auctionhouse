import { IconButton } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { FaBars, FaHamburger } from "react-icons/fa";
import useLightModeCheck from "../../libs/hooks/useLightModeCheck";
import SVGHamburger from "./SVGHamburger";
import styles from "../../styles/hamburgers.module.css";
import { Spin as Hamburger } from "hamburger-react";
interface HamburgerMenuProps {}

export default function HamburgerMenu(props: HamburgerMenuProps): JSX.Element {
  const [hover, setHover] = React.useState<boolean>(false);
  const lightMode = useLightModeCheck();
  return (
    <IconButton
      zIndex="5"
      icon={<Hamburger direction="left" size={20} />}
      aria-label="Menu"
      variant="transparent"
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
      m="2"
    />
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
