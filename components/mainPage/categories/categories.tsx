// import {
//   faCamera,
//   faCar,
//   faDesktop,
//   faFirstAid,
//   faGamepad,
//   faHome,
//   faTshirt,
//   faVolleyballBall,
// } from "@fortawesome/free-solid-svg-icons";
import {
  FaCamera,
  FaCar,
  FaDesktop,
  FaFirstAid,
  FaGamepad,
  FaHome,
  FaTshirt,
  FaVolleyballBall,
} from "react-icons/fa";

import React from "react";
import Category from "./category";
import { Flex, Grid } from "@chakra-ui/react";

interface CategoriesProps {
  position?: "left" | "center" | "right";
  small?: boolean;
}

export default function Categories(props: CategoriesProps): JSX.Element {
  function checkPosition() {
    if (!props.position) return "";
    if (props.position == "center") return "mx-auto";
    if (props.position == "left") return "mr-auto";
    if (props.position == "right") return "ml-auto";
  }

  return (
    <Flex
      flexWrap={props.small ? "nowrap" : "wrap"}
      justifyContent="center"
      width={props.small ? "100%" : "fit-content"}
      gridGap="2"
    >
      <Category
        icon={<FaDesktop />}
        color="blue.300"
        darkColor="blue.500"
        text="KOMPUTERY"
        small={props.small}
        categoryId={1}
        onClick={() => {}}
      />
      <Category
        icon={<FaGamepad />}
        color="pink.200"
        darkColor="pink.400"
        text="GRY"
        categoryId={2}
        small={props.small}
        onClick={() => {}}
      />
      <Category
        icon={<FaTshirt />}
        color="red.300"
        darkColor="red.500"
        text="ubrania"
        small={props.small}
        onClick={() => {}}
      />
      <Category
        icon={<FaFirstAid />}
        color="green.300"
        darkColor="green.500"
        text="zdrowie"
        small={props.small}
        onClick={() => {}}
      />
      <Category
        icon={<FaVolleyballBall />}
        color="yellow.200"
        darkColor="yellow.400"
        text="sport"
        small={props.small}
        onClick={() => {}}
      />
      <Category
        icon={<FaCar />}
        color="red.400"
        darkColor="red.600"
        text="motoryzacja"
        small={props.small}
        onClick={() => {}}
      />
      <Category
        icon={<FaHome />}
        color="blue.300"
        darkColor="blue.500"
        text="dom"
        small={props.small}
        onClick={() => {}}
      />
      <Category
        icon={<FaCamera />}
        color="green.200"
        darkColor="green.400"
        text="fotografia"
        small={props.small}
        onClick={() => {}}
      />
    </Flex>
  );
}
