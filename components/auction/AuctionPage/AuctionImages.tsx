import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/react";
import React from "react";
import useLightModeCheck from "../../../libs/hooks/useLightModeCheck";

interface AuctionImagesProps {
  image: string;
  name: string;
}

export default function AuctionImages(props: AuctionImagesProps): JSX.Element {
  const isLightMode = useLightModeCheck();
  const [scroll, setScroll] = React.useState<number>(0);
  function handleParallaxScrolling() {
    const scrolled = (scroll * -0.5).toString();
    console.log(scrolled);
    return scrolled + "px";
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
    <Box>
      <Image
        // ref={imageRef}
        src={props.image}
        borderRadius={["none", "2xl"]}
        shadow="lg"
        alt={props.name}
        pos="fixed"
        // top={handleParallaxScrolling()}
        style={{ top: handleParallaxScrolling() }}
        h={["65vh", "65vh", "50vh"]}
        objectFit="contain"
        bg="white"
        // w={`calc(100% - 2 * var(--chakra-space-${["0", "10", "20"]}))`}
        w={[
          "full",
          "calc(100% - 2 * var(--chakra-space-10))",
          "calc(100% - 2 * var(--chakra-space-20))",
        ]}
      />
    </Box>
  );
}
