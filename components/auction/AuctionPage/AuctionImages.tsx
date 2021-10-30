import { Image } from "@chakra-ui/image";
// import Image from "next/image";
import { Box } from "@chakra-ui/react";
import React from "react";
import useLightModeCheck from "../../../libs/hooks/useLightModeCheck";
import ImageCarousel from "../../ImageCarousel";

interface AuctionImagesProps {
  images: string[];
  name: string;
}

export default function AuctionImages(props: AuctionImagesProps): JSX.Element {
  return (
    <Box
      borderRadius={["none", "2xl"]}
      shadow="lg"
      pos="absolute"
      // style={{ top: handleParallaxScrolling() }}
      h={["65vh", "65vh", "50vh"]}
      // h="200px"
      bg="white"
      // w={`calc(100% - 2 * var(--chakra-space-${["0", "10", "20"]}))`}
      w={[
        "full",
        "calc(100% - 2 * var(--chakra-space-10))",
        "calc(100% - 2 * var(--chakra-space-20))",
      ]}
    >
      <ImageCarousel images={props.images} />
    </Box>
  );
}

// export default function AuctionImages(props: AuctionImagesProps): JSX.Element {
//   const isLightMode = useLightModeCheck();
//   const [scroll, setScroll] = React.useState<number>(0);

//   React.useEffect(() => {
//     if (typeof window === "undefined") return;
//     window.addEventListener("scroll", () => {
//       setScroll(window.scrollY);
//     });

//     return () => {
//       window.removeEventListener("scroll", () => {
//         setScroll(window.scrollY);
//       });
//     };
//   }, []);

//   function handleParallaxScrolling() {
//     const scrolled = (scroll * -0.5).toString();
//     // console.log(scrolled);
//     return scrolled + "px";
//   }

//   return (
//     <Box
//       borderRadius={["none", "2xl"]}
//       shadow="lg"
//       pos="fixed"
//       style={{ top: handleParallaxScrolling() }}
//       h={["65vh", "65vh", "50vh"]}
//       // h="200px"
//       bg="white"
//       // w={`calc(100% - 2 * var(--chakra-space-${["0", "10", "20"]}))`}
//       w={[
//         "full",
//         "calc(100% - 2 * var(--chakra-space-10))",
//         "calc(100% - 2 * var(--chakra-space-20))",
//       ]}
//     >
//       <Image
//         // ref={imageRef}
//         src={props.image}
//         alt={props.name}
//         // width={1920}
//         // width="100%"
//         // height="100%"
//         // height={1080}
//         objectFit="contain"
//         layout="fill"
//         // top={handleParallaxScrolling()}
//       />
//     </Box>
//   );
// }
