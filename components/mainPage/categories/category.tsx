import {
  IconDefinition,
  IconName,
  IconPrefix,
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React from "react";

interface CategoryProps {
  icon: IconDefinition;
  tailwindBgColor?: string;
  text: string;
  onClick?: () => void;
}

export const Category: React.FC<CategoryProps> = ({
  icon,
  tailwindBgColor,
  text,
  onClick,
}) => {
  return (
    <div
      className={`${
        tailwindBgColor ? tailwindBgColor : "bg-gray-200"
      }  flex flex-col justify-around items-center float-left p-3 cursor-pointer categoryIcon w-36 first:rounded-l-md last:rounded-r-md`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} opacity="0.7" size="2x" />
      <span className="opacity-70 font-semibold uppercase text-lg tracking-wide ">
        {text}
      </span>
    </div>
  );
};
export default Category;
