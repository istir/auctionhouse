// // import {
// //   faAddressBook,
// //   faAddressCard,
// //   faBookmark,
// //   faSignOutAlt,
// //   faUser,
// //   IconDefinition,
// // } from "@fortawesome/free-solid-svg-icons";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
// import { FaBookmark, FaSignOutAlt, FaUser } from "react-icons/fa";
// import React from "react";
// // import { Manager, Popper, Reference } from "react-popper";
// // import Popup from "reactjs-popup";
// // import "reactjs-popup/dist/index.css";
// import { simplifiedUser } from "../../types";
// import Login from "../login/login";
// import PopupLogin from "../login/PopupLogin";
// import PopupRegister from "../login/PopupRegister";
// import Register from "../login/register";
// import NameMenu from "./NameMenu";
// interface UserPopoutProps {
//   username: string | { firstName: string; lastName: string }; //TODO probably need to change object later to a prisma object
//   avatar?: string;
//   user?: simplifiedUser;
//   // popperInitialElement?: (
//   //   popperReference: React.LegacyRef<HTMLDivElement> | undefined,
//   //   onClickFunction: React.MouseEventHandler<HTMLDivElement> | undefined
//   // ) => JSX.Element;
//   // initialPoppedState?: "open" | "close";
//   isLogged?: boolean;
//   refresh: () => void;
//   closePopup?: () => void;
// }
// interface UserPopoutState {
//   // showPoppedElement: boolean;
// }

// /**
//  * Component renders a popper and it's parent element
//  * @component
//  * @type {string | {firstName:string, lastName:string}} username
//  * @type {((React.LegacyRef<HTMLDivElement>?, React.MouseEventHandler<HTMLDivElement>?)=>void)?} popperInitialElement -  that should open a popper upon clicking it.
//  * @type {"open"|"close"} initialPoppedState
//  * @type {string?} avatar
//  */

import { Flex } from "@chakra-ui/layout";
import React from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import PopupLogin from "../login/PopupLogin";
import PopupRegister from "../login/PopupRegister";
import HeaderUserMenuItem from "./headerUserMenuItem";
import axios from "axios";
import { User } from ".prisma/client";

interface UserPopoutProps {
  username: string | { firstName: string; lastName: string }; //TODO probably need to change object later to a prisma object
  avatar?: string;
  user?: User;

  isLogged?: boolean;
  refresh?: () => void;
  closePopup?: () => void;
}

export default function UserPopout(props: UserPopoutProps): JSX.Element {
  /**
   * This method renders a singular menu item
   * @type {string?} itemName
   * @type {IconDefinition?} faIcon
   * @returns React Component
   */

  /**
   * This method renders a menu
   */
  function renderMenu() {
    if (!props.user) return renderMenuLoginCard(); //? render login card if not already logged
    //! when testing change if
    return (
      <ul className="w-full">
        <HeaderUserMenuItem
          name={
            typeof props.username === "string"
              ? props.username
              : `${props.username.firstName} ${props.username.lastName}`
          }
          icon={<FaUser />}
          onClick={() => console.log("user")}
        />
        <HeaderUserMenuItem
          name="Wyloguj się"
          icon={<FaSignOutAlt />}
          onClick={() => {
            axios.get("/api/logout").then(() => {
              router.reload();
            });
          }}
        />
      </ul>
    );
  }

  /**
   * This method renders a login card for when user is not logged in.
   */
  function renderMenuLoginCard() {
    ``;
    //TODO: add some cool image and button to log in/register
    // const buttonClass = "rounded-md border-2 duration-150 font-semibold";
    return (
      // <Flex w="full" h="full" alignItems="center" justifyContent="center">
      // <Text></Text>
      <Flex w="full" h="full" justifyContent="center" alignItems="center">
        <Flex flexDirection="column" gridGap="3">
          <PopupLogin refresh={props.refresh} />
          <PopupRegister />
        </Flex>
      </Flex>
      //   </div>
      // </div>
    );
  }

  return renderMenu();
}

// export default class UserPopout extends React.Component<
//   UserPopoutProps,
//   UserPopoutState
// > {
//   refElement: any;

//   constructor(props: UserPopoutProps) {
//     super(props);
//     // this.state = {
//     //   showPoppedElement: this.props.initialPoppedState === "open",
//     // };
//     this.refElement = React.createRef();
//   }

//   /**
//    * This method renders a singular menu item
//    * @type {string?} itemName
//    * @type {IconDefinition?} faIcon
//    * @returns React Component
//    */
//   renderUserMenuItem(
//     itemName: string,
//     faIcon?: JSX.Element,
//     onClick?: () => void
//   ) {
//     return (
//       <li
//         className="flex items-center gap-1 h-10 pl-3 pr-3 border-t-2 first:border-none even:border-blue-200 odd:border-blue-200 cursor-pointer hover:bg-blue-200 duration-150 font-semibold"
//         onClick={onClick}
//       >
//         {faIcon}
//         {itemName}
//       </li>
//     );
//   }

//   /**
//    * This method renders a login card for when user is not logged in.
//    */
//   renderMenuLoginCard() {
//     //TODO: add some cool image and button to log in/register
//     // const buttonClass = "rounded-md border-2 duration-150 font-semibold";
//     return (
//       <div className="w-full h-full flex items-center justify-center">
//         <div className="flex flex-col gap-1">
//           <p>Nie zalogowano</p>
//           {/* <PopupLogin
//             refresh={this.props.refresh}
//             closePopup={this.props.closePopup}
//             isModalOpen={true}
//           /> */}
//           {/* <PopupLogin
//             refresh={this.props.refresh}
//             // closePopup={this.props.closePopup}
//           />
//           <PopupRegister closePopup={this.props.closePopup} /> */}
//         </div>
//       </div>
//     );
//   }

//   /**
//    * This method renders a menu
//    */
//   renderMenu() {
//     if (!this.props.user) return this.renderMenuLoginCard(); //? render login card if not already logged
//     //! when testing change if
//     return (
//       <ul className="w-full">
//         {this.renderUserMenuItem(
//           typeof this.props.username === "string"
//             ? this.props.username
//             : `${this.props.username.firstName} ${this.props.username.lastName}`,
//           <FaUser />
//         )}
//         {this.renderUserMenuItem("Wyloguj się", <FaSignOutAlt />, () => {
//           router.replace("/api/logout");
//         })}
//         {this.renderUserMenuItem("B", <FaBookmark />)}
//       </ul>
//     );
//   }

//   render() {
//     return this.renderMenu();
//     // return (
//     //   <div>

//     {
//       /* <nav
//         // ref={ref}
//         // style={style}
//         // data-placement={placement}
//         // className="min-w-max w-full  sm:w-56 h-72 rounded-md border-2 border-blue-200 bg-gray-200 flex  mt-2  overflow-y-auto overflow-x-hidden shadow-md"
//         >
//           {this.renderMenu()}
//         </nav> */
//     }
//     //     {/* <Popup trigger={this.props.popperInitialElement}>
//     //       <div>TEST</div>
//     //     </Popup> */}
//     //     {/* <div>TEST</div> */}
//     //     {/* <Manager>
//     //       <Reference>
//     //         {({ ref }) =>
//     //           this.props.popperInitialElement &&
//     //           this.props.popperInitialElement(ref, () => {
//     //             this.setState((prevState) => ({
//     //               showPoppedElement: !prevState.showPoppedElement,
//     //             }));
//     //           })
//     //         }
//     //       </Reference>
//     //       {this.state.showPoppedElement ? (
//     //         <Popper>
//     //           {({ ref, style, placement, arrowProps }) => (
//     //             <nav
//     //               ref={ref}
//     //               style={style}
//     //               data-placement={placement}
//     //               className="min-w-max w-full  sm:w-56 h-72 rounded-md border-2 border-blue-200 bg-gray-200 flex  mt-2  overflow-y-auto overflow-x-hidden shadow-md"
//     //             >
//     //               {this.renderMenu()}
//     //             </nav>
//     //           )}
//     //         </Popper>
//     //       ) : null}
//     //     </Manager> */}
//     //   </div>
//     // );
//   }
// }
