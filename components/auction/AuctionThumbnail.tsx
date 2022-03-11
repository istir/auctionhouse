import { Auction } from ".prisma/client";
import { Box, Grid, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

import React, { useContext } from "react";
import useColorSchemeContext from "../../libs/hooks/useColorSchemeContext";
import useLightModeCheck from "../../libs/hooks/useLightModeCheck";
import AuctionTimer from "./AuctionTimer";

interface AuctionThumbnailProps {
  auction: Auction;
  width?: string | number;
}

export default function AuctionThumbnail(
  props: AuctionThumbnailProps
): JSX.Element {
  const isLightMode = useLightModeCheck();
  const { color } = useContext(useColorSchemeContext);
  const router = useRouter();
  function renderImage(image: string) {
    if (!image) return <Box></Box>;
    return (
      <Image
        width="full"
        height="full"
        objectFit="contain"
        src={image}
        alt={props.auction.name}
        backgroundColor="white"
        borderBottomRadius={"lg"}
        shadow="md"
      />
    );
  }
  function renderPrice(originalPrice: number | null, price: number) {
    if (originalPrice && originalPrice > price) {
      return (
        <Grid templateColumns="min-content auto" gap="2" alignItems={"center"}>
          <Text
            fontSize="sm"
            textDecoration="line-through"
            color={isLightMode ? "gray.600" : "gray.400"}
          >
            {(originalPrice.toFixed(2) + "")
              .replace(".", ",")
              .replace(",00", "")}
            zł
          </Text>
          <Text
            color={isLightMode ? "red.400" : "red.600"}
            fontSize="lg"
            fontWeight={"bold"}
          >
            {(price.toFixed(2) + "").replace(".", ",").replace(",00", "")} zł
          </Text>
        </Grid>
      );
    } else {
      return (
        <Text
          // fontSize="lg"
          fontWeight={"bold"}
          color={isLightMode ? "gray.600" : "gray.400"}
        >
          {(price.toFixed(2) + "").replace(".", ",").replace(",00", "")} zł
        </Text>
      );
    }
  }
  /*
  function renderCorrectPrice(
    originalPrice: number | null,
    currentPrice: number
  ) {
    function renderOldPrice(oldPrice: number) {
      return (
        <Box
          display="inline-block"
          color={isLightMode ? "gray.600" : "gray.400"}
          fontSize={"sm"}
          fontWeight={"normal"}
          textDecoration={"line-through"}
          // textTransform={"uppercase"}
          marginRight="1.5"
        >
          {(oldPrice.toFixed(2) + "").replace(".", ",").replace(",00", "")} zł
        </Box>
      );
    }
    function renderCurrentPrice(currentPrice: number, sale: boolean) {
      return (
        <Box
          display="inline-block"
          fontWeight={"bold"}
          fontSize={sale ? "lg" : "md"}
          color={sale ? (isLightMode ? "red.400" : "red.600") : "current"}
        >
          {currentPrice} zł
        </Box>
      );
    }
    if (originalPrice && originalPrice > currentPrice) {
      // return <span className="line-through text-grey-400 font-semibold"></span>;
      return (
        <Flex alignItems={"center"}>
          {renderOldPrice(originalPrice)}
          {renderCurrentPrice(currentPrice, true)}
        </Flex>
      );
    } else {
      return renderCurrentPrice(currentPrice, false);
    }
  }
  */
  return (
    <Grid
      width={props.width || "64"}
      height="80"
      backgroundColor={isLightMode ? `white` : `gray.800`}
      borderRadius="lg"
      shadow={"lg"}
      margin="3"
      overflow={"hidden"}
      cursor={"pointer"}
      as={"a"}
      href={`/auction/${props.auction.url}`}
      onClick={() => {
        props.auction.url && router.push(`/auction/${props.auction.url}`);
      }}
      transition="all 0.2s ease-in-out"
      _hover={{ transform: "scale(1.05)" }}
      templateRows="65% auto"
    >
      {renderImage(props.auction.image[0])}
      <Grid templateRows={"3"} padding="2">
        <Box fontWeight={"bold"} noOfLines={1}>
          {props.auction.name}
        </Box>
        {renderPrice(props.auction.originalPrice, props.auction.price)}

        <AuctionTimer dateToEnd={props.auction.dateEnd} />
      </Grid>
    </Grid>
  );
}
// import { Auction } from "@prisma/client";
// import React, { useState } from "react";
// import { localizePersonsBought } from "../../libs/localizeStrings";
// import { convertMillisecondsToTime, formatTime } from "../../libs/time";
// // import { RemainingTime } from "../../types";

// interface AuctionProps {
//   auction: Auction;
// }

// export const AuctionComponent: React.FC<AuctionProps> = (props) => {
//   const [timeToEnd, setTimeToEnd] = useState("Czas do końca");
//   function renderImage(imageUrl: string) {
//     if (imageUrl) {
//       return (
//         <img
//           className="w-full h-56 rounded-md shadow-lg object-contain bg-white duration-300 border-2 border-gray-200 border-opacity-20"
//           src={imageUrl}
//         ></img>
//       );
//     } else {
//       return (
//         <img className="bg-white w-full h-56 rounded-md shadow-lg duration-300 border-2 border-gray-200 border-opacity-20"></img>
//       );
//     }
//   }

//   function renderOldPrice(price: number, originalPrice?: number | null) {
//     if (originalPrice && originalPrice > price) {
//       return (
//         <span className="line-through text-grey-400 font-semibold">
//           {(originalPrice.toFixed(2) + "").replace(".", ",").replace(",00", "")}{" "}
//           zł
//         </span>
//       );
//     }
//   }
//   function renderRemainingTime(dateEnd: string) {
//     const deadline = parseInt(dateEnd);
//     // if(timeToEnd)
//     if (!deadline && timeToEnd !== "") {
//       setTimeToEnd("");
//     }

//     const timer = setInterval(() => {
//       const difference = deadline - Date.now();
//       if (timeToEnd !== "00:00:00")
//         setTimeToEnd(
//           difference >= 0
//             ? formatTime(convertMillisecondsToTime(difference, "hours")) +
//                 " do końca"
//             : "00:00:00"
//         );
//     }, 1000);
//   }
//   renderRemainingTime(props.auction.dateEnd);

//   function timeColor(dateToEnd: string) {
//     const deadline = parseInt(dateToEnd);
//     // if(timeToEnd)
//     if (!deadline) return;
//     if (deadline - Date.now() < 3600000) return "text-red-400";
//     return "text-gray-400";
//   }
//   return (
//     <div className="auction bg-white flex flex-col  p-3 rounded-md shadow-md cursor-pointer select-none ">
//       {renderImage(props.auction.image)}
//       {/* <div>{renderRemainingTime(props.auction.dateEnd)}</div> */}
//       <div className="grid grid-cols-2 col-start-1 h-6">
//         {renderOldPrice(props.auction.price, props.auction.originalPrice)}
//         <span
//           className={`text-right col-start-2 font-semibold ${timeColor(
//             props.auction.dateEnd
//           )}`}
//         >
//           {timeToEnd}
//         </span>
//       </div>
//       {
//         <div>
//           <span className="text-grey-600 font-bold text-lg">
//             {(props.auction.price.toFixed(2) + "")
//               .replace(".", ",")
//               .replace(",00", "")}{" "}
//             zł
//           </span>
//         </div>
//       }
//       <div className="grid auction-name-persons">
//         <div className="text-grey-500 font-semibold overflow-ellipsis overflow-hidden">
//           {props.auction.name}
//         </div>
//         <div className="text-grey-400 font-semibold">
//           {localizePersonsBought(props.auction.usersBought)}
//         </div>
//       </div>
//     </div>
//   );

//   // return <div>{props.auction.name}</div>;
// };
// export default AuctionComponent;
