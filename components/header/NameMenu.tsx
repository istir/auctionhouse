// import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { User } from "@prisma/client";
import React from "react";
// import { Manager, Popper, Reference } from "react-popper";
// import Popup from "reactjs-popup";
import { simplifiedUser } from "../../types";
import UserPopout from "./UserPopout";
import { FaChevronDown } from "react-icons/fa";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import useColorSchemeContext from "../../libs/hooks/useColorSchemeContext";
import useLightModeCheck from "../../libs/hooks/useLightModeCheck";
import { Portal } from "@chakra-ui/react";

interface NameMenuProps {
  name?: string;
  avatar?: string;
  isLogged?: boolean;
  user?: simplifiedUser;
  refresh?: () => void;
  // token: string;

  //! podpytać czy ma sens wysyłanie tokenów
}
interface NameMenuState {
  popoutOpen: boolean;
}

export default function NameMenu(props: NameMenuProps): JSX.Element {
  const { color } = React.useContext(useColorSchemeContext);
  // const getColor = useColorValue;
  const light = useLightModeCheck();
  // const [open, setOpen] = React.useState<boolean>(false);
  // function openPopup() {
  //   setOpen(true);
  // }
  // function closePopup() {
  //   setOpen(false);
  // }
  // function toggleOpen() {
  //   setOpen((prevOpen) => !prevOpen);
  // }

  function getName(): string {
    if (props.user) return `${props.user.firstName} ${props.user.lastName}`;
    return "Zaloguj";
  }

  function renderAvatar(): JSX.Element {
    //! later on might change for next/image
    // if (props.avatar) return <Image src={props.avatar} alt="Profilowe" />;
    // return <FaUser />;
    return (
      <Image
        width="7"
        height="7"
        borderRadius="full"
        objectFit="cover"
        src="https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D"
        alt="Profilowe"
      />
    );
  }

  function renderNameMenu(): JSX.Element {
    return (
      <Button gridGap="2" aria-label="Użytkownik">
        {renderAvatar()}
        <Text fontWeight="bold" userSelect="none">
          {getName()}
        </Text>
        <FaChevronDown />
      </Button>
    );
  }

  return (
    <>
      {/* {renderNameMenu()} */}
      <Popover>
        <PopoverTrigger>
          {/* //! chakra-ui issue https://github.com/chakra-ui/chakra-ui/issues/4328 */}
          <Button gridGap="2" aria-label="Użytkownik">
            {renderAvatar()}
            <Text fontWeight="bold" userSelect="none">
              {getName()}
            </Text>
            <FaChevronDown />
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            mr="2"
            mt="3"
            h="md"
            w="sm"
            overflow="hidden"
            // border="2px solid #000"
            transitionProperty="box-shadow"
            transitionDuration="normal"
            boxShadow={
              light
                ? `0 0 0 2px var(--chakra-colors-${color}-200)`
                : `0 0 0 2px var(--chakra-colors-${color}-700)`
            }
            _focus={{
              boxShadow: light
                ? `0 0 0 3px var(--chakra-colors-${color}-300)`
                : `0 0 0 3px var(--chakra-colors-${color}-600)`,
            }}
            // justifyContent="center"
            // alignItems="center"
          >
            <PopoverArrow />

            <UserPopout
              user={props.user}
              username={getName()}
              refresh={props.refresh}
            />
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );

  // return ();
}
// export default class NameMenu extends React.Component<
//   NameMenuProps,
//   NameMenuState
// > {
//   // ref: React.Ref;
//   constructor(props: NameMenuProps) {
//     super(props);
//     this.ref = React.createRef();
//     this.state = { popoutOpen: false };
//   }
//   openPopup() {
//     this.setState({ popoutOpen: true });
//   }
//   closePopup() {
//     this.setState({ popoutOpen: false });
//   }
//   renderName(): string {
//     if (this.props.user) {
//       return this.props.user.firstName + " " + this.props.user.lastName;
//     }
//     return "Zaloguj";
//   }
//   //   getAvatar(): string | null {
//   //     if (this.props.avatar) return this.props.avatar;
//   //     return null; //! placeholder
//   //   }
//   renderAvatar(): JSX.Element {
//     //! later on might change for next/image
//     if (this.props.avatar)
//       return <img src={this.props.avatar} alt="Profilowe" />;
//     return <FaUser />;
//   }

//   renderNameMenu() {
//     return (
//       <div
//         className="group hover:text-blue-700 border-2 hover:border-blue-200 duration-150 p-1 hover:bg-blue-100 rounded-full cursor-pointer flex gap-2 group items-center transition-all"
//         onClick={this.openPopup.bind(this)}
//       >
//         {this.renderAvatar()}
//         <p className="font-bold select-none">{this.renderName()}</p>
//         <FaChevronDown />
//         {/* <FontAwesomeIcon
//           icon={faChevronDown}
//           className="cursor-pointer duration-150"
//         /> */}
//       </div>
//     );
//   }
//   render() {
//     return (

//       <Popover
//       // <div>
//         {/* <Popup
//           ref={this.ref}
//           // open={this.state.popoutOpen}
//           // onClose={this.closePopup.bind(this)}
//           nested
//           {...{
//             contentStyle: {
//               borderRadius: "0.375rem",
//               borderWidth: "2px",
//               borderColor: "rgba(191, 219, 254,1)",
//               backgroundColor: "rgba(229, 231, 235,1)",
//               height: "18rem",
//               right: "5px",
//               marginRight: "5px",
//               // overflowX: "hidden",
//             },
//             // overlayStyle: {
//             //   right: "20px",
//             //   marginRight: "20px",
//             // },
//             arrowStyle: {
//               color: "rgba(229, 231, 235,1)",
//               // filter:"drop-shadow(0px -2px 0px rgba(191, 219, 254,1))"

//               // borderWidth: "2px",
//               stroke: "rgba(191, 219, 254,1)",
//               // textShadow:""
//             },
//           }}
//           // className="min-w-max w-full  sm:w-56 h-72 rounded-md border-2 border-blue-200 bg-gray-200 flex  mt-2  overflow-y-auto overflow-x-hidden shadow-md"
//           trigger={this.renderNameMenu()}
//         >

//           <UserPopout
//             user={this.props.user}
//             username={this.renderName()}
//             refresh={this.props.refresh}
//             closePopup={
//               this.ref?.current?.close
//                 ? this.ref.current.close.bind(this)
//                 : null
//             }
//           />

//         </Popup> */}
//         {/* {this.renderNameMenu()} */}
//         {/* <UserPopout
//           username={this.renderName()}
//           popperInitialElement={this.renderNameMenu.bind(this)}
//           isLogged={this.props.isLogged}
//         /> */}
//       // </div>
//     );
//   }
// }
