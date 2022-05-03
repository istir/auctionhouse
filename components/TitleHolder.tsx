import {
  Box,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorModeValue,
  useDimensions,
} from "@chakra-ui/react";
import { NextRouter } from "next/router";
import React, { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface TitleHolderProps {
  children: React.ReactNode;
  title: string;
  backgroundColor?: string;
  router?: NextRouter;
}

export default function TitleHolder(props: TitleHolderProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(ref, true);
  const color = useColorModeValue("light.primary1", "dark.primary1");

  function isScrolled() {
    return dimensions && dimensions?.marginBox?.top < 0;
  }

  return (
    <Box>
      <Box ref={ref} position="relative">
        <Box
          width="full"
          zIndex={"banner"}
          backgroundColor={props.backgroundColor || color}
          position={isScrolled() ? "fixed" : "absolute"}
          top={isScrolled() ? "0px" : "unset"}
          paddingY={isScrolled() ? "1" : "2"}
          paddingX="2"
          transitionDuration={"0.2s"}
          boxShadow={"md"}
        >
          <Flex alignItems={"center"} gap="2">
            {props.router && (
              <Popover trigger="hover">
                <PopoverTrigger>
                  <IconButton
                    aria-label="Wróć"
                    icon={<FaArrowLeft />}
                    borderRadius="full"
                    variant="ghost"
                    onClick={() => {
                      props.router?.back();
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent width={"max-content"}>
                  <PopoverArrow /> <PopoverBody>Cofnij</PopoverBody>
                </PopoverContent>
              </Popover>
            )}
            <Text
              pos={"sticky"}
              noOfLines={1}
              top="0"
              transitionDuration={"0.2s"}
              fontSize={{
                base: isScrolled() ? "lg" : "2xl",
                md: isScrolled() ? "xl" : "3xl",
              }}
            >
              {props.title}
            </Text>
          </Flex>
        </Box>
      </Box>

      <Box paddingTop={`${60}px`}>{props.children}</Box>
    </Box>
  );
}
