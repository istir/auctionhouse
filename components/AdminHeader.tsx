import { Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react";
import { Admin } from "@prisma/client";
import React from "react";
import ColorModeSwitcher from "./ColorModeSwitcher";
import NextButton from "./NextButton";

interface AdminHeaderProps {
  admin?: Admin;
  dontRenderBG?: boolean;
  renderAsFixed?: boolean;
  justifyContent?: string;
}

export default function AdminHeader(props: AdminHeaderProps): JSX.Element {
  const c = useColorModeValue("light.primary3", "dark.primary3");
  return (
    <Flex
      backgroundColor={props.dontRenderBG ? "transparent" : c}
      padding="3"
      position={props.renderAsFixed ? "fixed" : "relative"}
      justifyContent={props.justifyContent || "right"}
      right={props.renderAsFixed ? "0" : "auto"}
      left={props.renderAsFixed ? "0" : "auto"}
      top={props.renderAsFixed ? "0" : "auto"}
    >
      {props.admin ? (
        <Flex flexDir={"column"} gap="2">
          <Flex
            gap="2"
            flexDir={"row"}
            justifyContent={props.justifyContent || "right"}
          >
            <Text> Zalogowany jako administrator:</Text>
            <Text fontWeight={"bold"}>{props?.admin?.email}</Text>
          </Flex>
          <Grid
            gap="2"
            width={
              props.justifyContent === "center"
                ? "100%"
                : "calc(100vw - calc(var(--chakra-sizes-5) * 2))"
            }
            gridTemplateColumns={"repeat(auto-fit,minmax(240px,1fr))"}
          >
            <NextButton href="/admin">Strona główna panelu</NextButton>
            <NextButton href="/">Auctionhouse</NextButton>
            <NextButton href="/admin/addAdmin">Dodaj administratora</NextButton>
            <NextButton href="/admin/removeAdmin">
              Usuń administratora
            </NextButton>

            <NextButton href="/api/admin/logout">Wyloguj</NextButton>
            <ColorModeSwitcher
              variant="solid"
              colorScheme={"gray"}
              text="Zmień motyw"
            />
          </Grid>
        </Flex>
      ) : (
        <Grid
          gap="2"
          width={
            props.justifyContent === "center"
              ? "100%"
              : "calc(100vw - calc(var(--chakra-sizes-5) * 2))"
          }
          gridTemplateColumns={"repeat(auto-fit,minmax(240px,1fr))"}
        >
          <NextButton href="/admin">Strona główna</NextButton>
          <NextButton href="/admin/login">Zaloguj się</NextButton>
          <ColorModeSwitcher
            variant="solid"
            colorScheme={"gray"}
            text="Zmień motyw"
          />
        </Grid>
      )}
    </Flex>
  );
}
