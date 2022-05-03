import {
  Box,
  Button,
  Collapse,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Category, CategoryParent } from "@prisma/client";
import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import NextButton from "../../NextButton";

interface CategoriesProps {
  parentCategories: (CategoryParent & {
    categories: Category[];
  })[];
  flexDirection?: { base: "column" | "row"; md: "column" | "row" };
  dontRenderHeader?: boolean;
  gridDirection?: "row" | "column";
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  collapsable?: boolean;
}

export default function Categories(props: CategoriesProps): JSX.Element {
  const colors = useColorModeValue("light.primary1", "dark.primary1");
  const buttonColors = useColorModeValue("light.primary4", "dark.primary4");
  const { isOpen, onToggle } = useDisclosure();
  function renderCategories() {
    return (
      <Grid
        pb="5"
        gap={{ base: "3", md: "6" }}
        m="3"
        gridAutoColumns={"3"}
        alignItems="normal"
      >
        {props.dontRenderHeader || (
          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            mb={{ base: "2", md: "6" }}
          >
            Wszystkie kategorie
          </Text>
        )}
        <Grid
          gridTemplateColumns={
            props.gridDirection === "column"
              ? props.gridTemplateColumns ||
                "repeat(auto-fit,minmax(240px,1fr))"
              : ""
          }
          gridTemplateRows={
            props.gridDirection === "row"
              ? props.gridTemplateRows || "repeat(auto-fit,minmax(240px,1fr))"
              : ""
          }
          gap={{ base: "3", md: "6" }}
        >
          {props.parentCategories?.map(
            (parentCategory) =>
              parentCategory?.categories?.length > 0 && (
                <Box
                  key={parentCategory.id}
                  backgroundColor={colors}
                  padding={4}
                  borderRadius="lg"
                  boxShadow={"lg"}
                >
                  <Text fontSize={{ base: "xl", md: "2xl" }} mb="2">
                    {parentCategory.name}
                  </Text>
                  <Flex
                    flexDirection={
                      props.flexDirection || { base: "column", md: "row" }
                    }
                    gap="2"
                  >
                    {parentCategory.categories?.map((category) => (
                      <NextButton
                        key={category.id}
                        href={`/categories/${category.url || "#"}`}
                        borderRadius={"lg"}
                        boxShadow="sm"
                        backgroundColor={buttonColors}
                      >
                        <Text>{category.name}</Text>
                      </NextButton>
                    ))}
                  </Flex>
                </Box>
              )
          )}
        </Grid>
      </Grid>
    );
  }
  //   <Collapse in={isOpen} animateOpacity>
  //   <HamburgerOptions
  //     currentUser={props.user}
  //     refresh={props.refresh}
  //     loggedIn={props.user ? true : false}
  //   />
  // </Collapse>
  if (!props.parentCategories) return <></>;
  if (props.collapsable)
    return (
      <Flex justifyContent={"center"} flexDirection="column" width="full" m="2">
        <Flex alignItems={"center"} justifyContent="center">
          <Button onClick={onToggle} width="max-content" bgColor={buttonColors}>
            <Flex gap="2" alignItems={"center"}>
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              <Text>Wszystkie kategorie</Text>
            </Flex>
          </Button>
        </Flex>
        <Collapse in={isOpen}>{renderCategories()}</Collapse>
      </Flex>
    );
  return renderCategories();
}
