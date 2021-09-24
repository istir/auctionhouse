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
      <div
        className={` shadow-lg w-[fit-content] grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2 lg:grid-cols-8 lg:grid-rows-1 md:h-40 lg:h-24  ${this.checkPosition()}`}
      >
        <Category
          icon={<FaDesktop />}
          tailwindBgColor="bg-blue-300"
          text="KOMPUTERY"
          onClick={() => {}}
        />
        <Category
          icon={<FaGamepad />}
          tailwindBgColor="bg-pink-200"
          text="GRY"
          onClick={() => {}}
        />
        <Category
          icon={<FaTshirt />}
          tailwindBgColor="bg-red-300"
          text="ubrania"
          onClick={() => {}}
        />
        <Category
          icon={<FaFirstAid />}
          tailwindBgColor="bg-green-300"
          text="zdrowie"
          onClick={() => {}}
        />
        <Category
          icon={<FaVolleyballBall />}
          tailwindBgColor="bg-yellow-200"
          text="sport"
          onClick={() => {}}
        />
        <Category
          icon={<FaCar />}
          tailwindBgColor="bg-red-400"
          text="motoryzacja"
          onClick={() => {}}
        />
        <Category
          icon={<FaHome />}
          tailwindBgColor="bg-blue-300"
          text="dom"
          onClick={() => {}}
        />
        <Category
          icon={<FaCamera />}
          tailwindBgColor="bg-green-200"
          text="fotografia"
          onClick={() => {}}
        />
      </div>
    );
  }
}
