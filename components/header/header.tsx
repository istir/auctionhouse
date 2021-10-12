import React, { useContext } from "react";
import Image from "next/image";
import IconMenu from "./IconMenu";
import NameMenu from "./NameMenu";
import vercel from "../../public/vercel.svg";
import { Token, User } from "@prisma/client";
import ajaxUser from "../../libs/AJAXUser";
import { simplifiedUser } from "../../types";
import { Flex, useBreakpoint } from "@chakra-ui/react";
import useColorSchemeContext from "../../libs/hooks/useColorSchemeContext";
import useLightModeCheck from "../../libs/hooks/useLightModeCheck";
import HamburgerMenu from "./HamburgerMenu";
interface HeaderProps {
  user?: simplifiedUser;
  token?: string;
  refresh?: () => void;
  drawerWidth: string;
  isDrawerOpen: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
}
//TODO: Change logic so that user is axios'd
export const Header: React.FC<HeaderProps> = ({
  user,
  refresh,
  drawerWidth,
  ...props
}) => {
  // console.log(userId);
  // userId && ajaxUser(userId);

  const { color } = useContext(useColorSchemeContext);
  const lightMode = useLightModeCheck();
  function drawLogo(imgName?: string): JSX.Element {
    if (imgName) return <Image src="/public/imgName" />;
    return <Image width="100px" height="30px" src={vercel} />;
  }

  function renderCorrectMenu(currentSize: string | undefined) {
    switch (currentSize) {
      case "base":
        return (
          <HamburgerMenu
            drawerWidth={drawerWidth}
            isDrawerOpen={props.isDrawerOpen}
            onDrawerOpen={props.onDrawerOpen}
            onDrawerClose={props.onDrawerClose}
          />
        );
      case "sm":
        return (
          <HamburgerMenu
            drawerWidth={drawerWidth}
            isDrawerOpen={props.isDrawerOpen}
            onDrawerOpen={props.onDrawerOpen}
            onDrawerClose={props.onDrawerClose}
          />
        );

      default:
        return (
          <HamburgerMenu
            drawerWidth={drawerWidth}
            isDrawerOpen={props.isDrawerOpen}
            onDrawerOpen={props.onDrawerOpen}
            onDrawerClose={props.onDrawerClose}
          />
        );
    }
  }
  return renderCorrectMenu(useBreakpoint());
  return (
    // <header className=" pl-3 pr-3 md:pl-10 md:pr-10 flex justify-between sticky bg-gray-200 dark:bg-gray-700 min-w-full min-h-full p-1 h-12 md:h-16 items-center shadow-md">
    //   {drawLogo()}
    //   <nav className="flex items-center gap-3">
    //     <IconMenu />
    //     <NameMenu user={user} refresh={refresh} />
    //   </nav>
    // </header>
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
        <NameMenu user={user} refresh={refresh} />
      </Flex>
    </Flex>
  );
};
export default Header;
