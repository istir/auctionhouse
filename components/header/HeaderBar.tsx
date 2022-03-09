import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import useLightModeCheck from "../../libs/hooks/useLightModeCheck";
import IconMenu from "./IconMenu";
import NameMenu from "./NameMenu";
import vercel from "../../public/vercel.svg";
import { User } from ".prisma/client";
import { useRouter } from "next/router";
interface HeaderBarProps {
  refresh?: () => void;
  user?: User;
}

export default function HeaderBar(props: HeaderBarProps): JSX.Element {
  const lightMode = useLightModeCheck();
  const router = useRouter();
  function drawLogo(imgName?: string): JSX.Element {
    if (imgName)
      return (
        <Box
          cursor="pointer"
          onClick={() => {
            router.replace("/");
          }}
        >
          <Image src="/public/imgName" alt="Image" />
        </Box>
      );
    return (
      <Box
        cursor="pointer"
        onClick={() => {
          router.replace("/");
        }}
      >
        <Image width="100px" height="30px" src={vercel} alt="Image" />
      </Box>
    );
  }
  return (
    <Flex
      as="header"
      px={["3", "10"]}
      justifyContent="space-between"
      pos="sticky"
      bg={lightMode ? `gray.200` : `gray.700`}
      minW="full"
      minH="full"
      p="1"
      h={[12, 16]}
      alignItems="center"
      shadow="md"
      zIndex="5"
    >
      {drawLogo()}
      <Flex as="nav" alignItems="center" gridGap="3">
        {/* className="flex items-center gap-3" */}
        <IconMenu />
        <NameMenu refresh={props.refresh} user={props.user} />
      </Flex>
    </Flex>
  );
}
