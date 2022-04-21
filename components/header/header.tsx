import React, { useContext } from "react";

import useColorSchemeContext from "../../libs/hooks/useColorSchemeContext";
import HamburgerMenu from "./HamburgerMenu";
import HeaderBar from "./HeaderBar";
import { User } from ".prisma/client";
interface HeaderProps {
  user?: User;
  token?: string;
  refresh?: () => void;
  drawerWidth?: string;
  // isDrawerOpen?: boolean;
  // onDrawerOpen?: () => void;
  // onDrawerClose?: () => void;
}
//TODO: Change logic so that user is axios'd
export const Header: React.FC<HeaderProps> = ({
  user,
  // refresh,
  drawerWidth,
  ...props
}) => {
  // console.log(userId);
  // userId && ajaxUser(userId);

  const { color } = useContext(useColorSchemeContext);
  const [refresh, setRefresh] = React.useState<number>(0);

  // function performRefresh() {
  //   console.log("refreshing...", user);
  //   setRefresh(refresh + 1);
  // }
  function renderCorrectMenu(currentSize: string | undefined) {
    switch (currentSize) {
      case "base":
        return (
          <HamburgerMenu
            user={user}
            drawerWidth={drawerWidth}
            refresh={props.refresh}
          />
        );
      case "sm":
        return (
          <HamburgerMenu
            user={user}
            drawerWidth={drawerWidth}
            refresh={props.refresh}
          />
        );
      case "md":
        return (
          <HamburgerMenu
            user={user}
            drawerWidth={drawerWidth}
            refresh={props.refresh}
          />
        );
      case "lg":
        return <HeaderBar refresh={props.refresh} user={user} />;

      default:
        return <HeaderBar refresh={props.refresh} user={user} />;
    }
  }
  // return renderCorrectMenu(useBreakpoint());
  return <HamburgerMenu user={user} refresh={props.refresh} />;
  // return (
  //   // <header className=" pl-3 pr-3 md:pl-10 md:pr-10 flex justify-between sticky bg-gray-200 dark:bg-gray-700 min-w-full min-h-full p-1 h-12 md:h-16 items-center shadow-md">
  //   //   {drawLogo()}
  //   //   <nav className="flex items-center gap-3">
  //   //     <IconMenu />
  //   //     <NameMenu user={user} refresh={refresh} />
  //   //   </nav>
  //   // </header>
  //   // <Flex
  //   //   as="header"
  //   //   px={["3", "10"]}
  //   //   justifyContent="space-between"
  //   //   pos="sticky"
  //   //   bg={lightMode ? `gray.200` : `gray.700`}
  //   //   minW="full"
  //   //   minH="full"
  //   //   p="1"
  //   //   h={[12, 16]}
  //   //   alignItems="center"
  //   //   shadow="md"
  //   //   zIndex="5"
  //   // >
  //   //   {drawLogo()}
  //   //   <Flex as="nav" alignItems="center" gridGap="3">
  //   //     {/* className="flex items-center gap-3" */}
  //   //     <IconMenu />
  //   //     <NameMenu user={user} refresh={refresh} />
  //   //   </Flex>
  //   // </Flex>
  // );
};
export default Header;
