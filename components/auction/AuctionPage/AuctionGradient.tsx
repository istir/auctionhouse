import { Box } from "@chakra-ui/layout";
import React from "react";

interface AuctionGradientProps {
  lightMode: boolean;
}

export default function AuctionGradient(
  props: AuctionGradientProps
): JSX.Element {
  const [scroll, setScroll] = React.useState<number>(0);

  function gradientTransform() {
    if (scroll < 100) {
      return `scaleY(${scroll / 100})`;
    } else {
      return "scaleY(1)";
    }
  }
  function gradientOpacity() {
    if (scroll < 200) {
      return `${(scroll * 0.5) / 100}`;
    } else {
      return "1";
    }
  }

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        setScroll(window.scrollY);
      });
    };
  }, []);

  return (
    <Box
      mt="-52"
      bgImage={`linear-gradient(180deg, rgba(255,0,0,0) 0%, var(--chakra-colors-${
        props.lightMode ? "white" : "gray-800"
      }) 100%);`}
      // transform={gradientTransform()}
      pointerEvents="none"
      style={{
        opacity: gradientOpacity(),
      }}
      // opacity={gradientOpacity()}
      transformOrigin="bottom"
      h="48"
    ></Box>
  );
}
