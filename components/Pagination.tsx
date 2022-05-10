import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import NextButton from "./NextButton";

interface PaginationProps {
  page: number;
  allPages: number;
  functionToApply: (page: number) => string;
  maxPages?: number;
  hideIfZero?: boolean;
}

export default function Pagination(props: PaginationProps): JSX.Element {
  console.log(props.allPages, props.page);
  const difference = Math.ceil(props.allPages) - Math.ceil(props.page);
  const pages = [...Array(difference + 1).keys()].slice(1);
  const max = props.maxPages || 5;
  function renderNextButton(prev?: boolean) {
    return (
      <NextButton
        borderRadius={"full"}
        margin="0.5"
        padding="0"
        variant="ghost"
        href={props.functionToApply(prev ? props.page - 1 : props.page + 1)}
      >
        {prev ? <FaChevronLeft /> : <FaChevronRight />}
      </NextButton>
    );
  }

  function renderPageButton(number: number, current?: boolean) {
    return (
      <NextButton
        borderRadius={"full"}
        margin="0.5"
        padding="0"
        variant={current ? "ghost" : "solid"}
        key={number}
        href={props.functionToApply(number)}
        disabled={current}
      >
        {number}
      </NextButton>
    );
  }
  function renderPagesBetween() {
    if (pages.length < 1) return <Box></Box>;
    return pages.map(
      (page, iter) =>
        page + props.page > props.page &&
        iter < max &&
        renderPageButton(page + props.page)
    );
  }
  if (props.hideIfZero && difference === 0) return <Box></Box>;
  if (props.page >= props.allPages)
    return (
      <Flex justifyContent={"center"} alignItems="center">
        {renderPageButton(props.page, true)}
      </Flex>
    );

  return (
    <Flex justifyContent={"center"} alignItems="center">
      {renderNextButton(true)}
      {/* <Text mr="1.5" fontWeight={"bold"}>
        {props.page}
      </Text> */}
      {renderPageButton(props.page, true)}
      {renderPagesBetween()}
      {props.allPages > props.page + max && (
        <Text fontWeight={"bold"} m="2">
          ...
        </Text>
      )}
      {renderPageButton(props.allPages)}
      {renderNextButton()}
    </Flex>
  );
}
