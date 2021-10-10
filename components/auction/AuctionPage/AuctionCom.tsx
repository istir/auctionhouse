import { Auction, Category, User } from ".prisma/client";
import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import useColorSchemeContext from "../../../libs/hooks/useColorSchemeContext";
import useLightModeCheck from "../../../libs/hooks/useLightModeCheck";
import ColorModeSwitcher from "../../ColorModeSwitcher";
import Header from "../../header/header";
import AuctionHeader from "./AuctionHeader";
import AuctionImages from "./AuctionImages";

interface AuctionProps {
  auction: Auction & {
    category: Category;
    seller: User;
    buyer: User | null;
  };
}

export default function AuctionCom(props: AuctionProps): JSX.Element {
  const isLightMode = useLightModeCheck();
  const colorScheme = React.useContext(useColorSchemeContext);
  return (
    <Box>
      {/* <Header /> */}
      <ColorModeSwitcher zIndex="2" />
      <Box
        m={["0", "10", "20"]}
        shadow={["none", "md"]}
        // px={["3", "10"]}
        // py="8"
        borderRadius="md"
      >
        <AuctionImages name={props.auction.name} image={props.auction.image} />
        <Box zIndex="2" pos="relative" mt={["65vh", "65vh", "50vh"]}>
          <Box
            mt="-28"
            bgImage={`linear-gradient(180deg, rgba(255,0,0,0) 0%, var(--chakra-colors-gray-${
              isLightMode ? "50" : "900"
            }) 100%);`}
            h="32"
          ></Box>
          <Box
            bg={isLightMode ? "gray.50" : "gray.900"}
            px={["3", "10"]}
            // mt="-6"
          >
            <AuctionHeader auction={props.auction} />
            <Text zIndex="2" pos="relative">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ad
              perferendis similique minima suscipit aspernatur veritatis, minus
              tenetur quaerat cum autem, ex, in magni eaque? Magni, laboriosam!
              Quaerat, minus officiis. Similique dicta ad alias quos impedit
              deserunt id possimus, unde voluptas ea voluptate dolorem repellat
              maiores libero soluta officia? Laudantium dolorum voluptatum
              maxime fugit corporis consequatur dolor facere at excepturi!
              Voluptatum hic pariatur dolor, ipsa in asperiores officiis! Error
              quisquam facere, culpa vitae unde eum nihil quos nam excepturi
              ratione esse vero. Laboriosam porro ratione harum tempore
              voluptatem id? Ipsa! Perspiciatis magni minima error eos rem
              aspernatur culpa molestiae? Commodi magnam quos nemo possimus?
              Dolores repudiandae dolorum amet fugit cupiditate neque veniam
              reiciendis consequatur? Corporis, totam? Tempora fugiat tempore
              quo. Veniam impedit nam sed modi, ea repellat repudiandae
              voluptates enim exercitationem odio iure, et ipsum. Voluptates
              dolorem eligendi natus culpa illum aliquam ipsa reiciendis
              deserunt suscipit! Excepturi provident iste maiores. Voluptatem
              totam deleniti blanditiis rerum soluta quibusdam! Vero cum odio
              possimus placeat sunt debitis ipsa ratione facilis quas! Minima
              voluptas consectetur perspiciatis odit blanditiis! Sapiente
              perferendis soluta repudiandae veritatis nemo? Natus voluptate,
              adipisci cum laborum, eveniet illum atque rem explicabo fugit
              autem aliquid reiciendis aspernatur ipsam quae quas eligendi
              nesciunt blanditiis debitis doloremque harum. Non ducimus corporis
              ut fugiat dolorem! Voluptatibus, esse! Suscipit quasi iusto optio
              commodi eius, expedita aut? A facilis possimus, fugit beatae,
              dolorum repellat quod rem, quidem ipsam corporis ipsa perspiciatis
              eum nisi ut eveniet cupiditate aperiam. Beatae eos, voluptas enim
              soluta nulla eveniet maiores esse itaque asperiores obcaecati
              quasi dolor modi praesentium rem, eligendi alias ea ut ullam? Nam
              obcaecati, atque inventore provident maiores fugiat laudantium!
              Itaque minima praesentium voluptatibus dolores, alias nisi.
              Veniam, aliquid ratione. Numquam dignissimos exercitationem facere
              voluptates similique cupiditate quis suscipit possimus eaque odio,
              culpa ea, mollitia perferendis corrupti error sit illum.
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
