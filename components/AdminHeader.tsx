import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Admin } from "@prisma/client";
import React from "react";
import ColorModeSwitcher from "./ColorModeSwitcher";
import NextButton from "./NextButton";

interface AdminHeaderProps {
  admin?: Admin;
}

export default function AdminHeader(props: AdminHeaderProps): JSX.Element {
  return (
    <Box
      backgroundColor={useColorModeValue("light.primary3", "dark.primary3")}
      padding="3"
    >
      {props.admin ? (
        <Box>
          <Flex gap="2" flexDir={"row"}>
            <Text> Zalogowany jako administrator:</Text>
            <Text fontWeight={"bold"}>{props?.admin?.email}</Text>
          </Flex>
          <NextButton href="/api/admin/logout">Wyloguj</NextButton>
          <NextButton href="/admin/addAdmin">Dodaj administratora</NextButton>
          <NextButton href="/admin/removeAdmin">Usuń administratora</NextButton>
          <ColorModeSwitcher />
        </Box>
      ) : (
        <Box>
          <NextButton href="/admin/login">Zaloguj się</NextButton>
        </Box>
      )}
    </Box>
  );
}
