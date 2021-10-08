import { Flex } from "@chakra-ui/react";
import React from "react";
import {
  FaDesktop,
  FaGamepad,
  FaTshirt,
  FaFirstAid,
  FaVolleyballBall,
  FaCar,
  FaHome,
  FaCamera,
} from "react-icons/fa";
import Category from "./category";

interface CategoriesSmallProps {}

export default function CategoriesSmall(
  props: CategoriesSmallProps
): JSX.Element {
  return (
    <Flex flexWrap="nowrap" justifyContent="center" width="100%" gridGap="2">
      <Category
        icon={<FaDesktop />}
        color="blue.300"
        darkColor="blue.500"
        text="KOMPUTERY"
        small
        onClick={() => {}}
      />
      <Category
        icon={<FaGamepad />}
        color="pink.200"
        darkColor="pink.400"
        text="GRY"
        small
        onClick={() => {}}
      />
      <Category
        icon={<FaTshirt />}
        color="red.300"
        darkColor="red.500"
        text="ubrania"
        small
        onClick={() => {}}
      />
      <Category
        icon={<FaFirstAid />}
        color="green.300"
        darkColor="green.500"
        text="zdrowie"
        small
        onClick={() => {}}
      />
      <Category
        icon={<FaVolleyballBall />}
        color="yellow.200"
        darkColor="yellow.400"
        text="sport"
        small
        onClick={() => {}}
      />
      <Category
        icon={<FaCar />}
        color="red.400"
        darkColor="red.600"
        text="motoryzacja"
        small
        onClick={() => {}}
      />
      <Category
        icon={<FaHome />}
        color="blue.300"
        darkColor="blue.500"
        text="dom"
        small
        onClick={() => {}}
      />
      <Category
        icon={<FaCamera />}
        color="green.200"
        darkColor="green.400"
        text="fotografia"
        small
        onClick={() => {}}
      />
    </Flex>
  );
}
