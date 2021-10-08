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
}
interface CategoriesState {}

export default class Categories extends React.Component<
  CategoriesProps,
  CategoriesState
> {
  checkPosition() {
    if (!this.props.position) return "";
    if (this.props.position == "center") return "mx-auto";
    if (this.props.position == "left") return "mr-auto";
    if (this.props.position == "right") return "ml-auto";
  }

  render() {
    return (
      // <div
      //   className={` shadow-lg w-[fit-content] grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2 lg:grid-cols-8 lg:grid-rows-1 md:h-40 lg:h-24  ${this.checkPosition()}`}
      // >
      <Flex
        // gridTemplateColumns={[
        //   "repeat(2,auto)",
        //   "repeat(4,auto)",
        //   "repeat(8,auto)",
        // ]}
        // gridTemplateRows={[
        //   "repeat(4,auto)",
        //   "repeat(2,auto)",
        //   "repeat(1,auto)",
        // ]}
        flexWrap="wrap"
        justifyContent="center"
        width="fit-content"
        gridGap="2"
      >
        <Category
          icon={<FaDesktop />}
          color="blue.300"
          darkColor="blue.500"
          text="KOMPUTERY"
          onClick={() => {}}
        />
        <Category
          icon={<FaGamepad />}
          color="pink.200"
          darkColor="pink.400"
          text="GRY"
          onClick={() => {}}
        />
        <Category
          icon={<FaTshirt />}
          color="red.300"
          darkColor="red.500"
          text="ubrania"
          onClick={() => {}}
        />
        <Category
          icon={<FaFirstAid />}
          color="green.300"
          darkColor="green.500"
          text="zdrowie"
          onClick={() => {}}
        />
        <Category
          icon={<FaVolleyballBall />}
          color="yellow.200"
          darkColor="yellow.400"
          text="sport"
          onClick={() => {}}
        />
        <Category
          icon={<FaCar />}
          color="red.400"
          darkColor="red.600"
          text="motoryzacja"
          onClick={() => {}}
        />
        <Category
          icon={<FaHome />}
          color="blue.300"
          darkColor="blue.500"
          text="dom"
          onClick={() => {}}
        />
        <Category
          icon={<FaCamera />}
          color="green.200"
          darkColor="green.400"
          text="fotografia"
          onClick={() => {}}
        />
      </Flex>
    );
  }
}
