import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Admin } from "@prisma/client";
import React from "react";
import ColorModeSwitcher from "../../components/ColorModeSwitcher";
import NextButton from "../../components/NextButton";

interface AdminHeaderProps {
  admin: Admin;
}

export default function AdminHeader(props: AdminHeaderProps): JSX.Element {
  return (
    <Box
      backgroundColor={useColorModeValue("light.primary3", "dark.primary3")}
      padding="3"
    >
      <Box>
        <Flex gap="2" flexDir={"row"}>
          <Text> Zalogowany jako administrator:</Text>
          <Text fontWeight={"bold"}>{props.admin.email}</Text>
        </Flex>
        <NextButton href="/api/admin/logout">Wyloguj</NextButton>
        <NextButton href="/admin/addAdmin">Dodaj administratora</NextButton>
        <NextButton href="/admin/removeAdmin">Usuń administratora</NextButton>
        <ColorModeSwitcher />
      </Box>
    </Box>
  );
}
