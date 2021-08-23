import {
  faAddressBook,
  faAddressCard,
  faBookmark,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
import React from "react";
import { Manager, Popper, Reference } from "react-popper";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { simplifiedUser } from "../../types";
import Login from "../login/login";
import PopupLogin from "../login/PopupLogin";
import PopupRegister from "../login/PopupRegister";
import Register from "../login/register";
import NameMenu from "./NameMenu";
interface UserPopoutProps {
  username: string | { firstName: string; lastName: string }; //TODO probably need to change object later to a prisma object
  avatar?: string;
  user: simplifiedUser;
  // popperInitialElement?: (
  //   popperReference: React.LegacyRef<HTMLDivElement> | undefined,
  //   onClickFunction: React.MouseEventHandler<HTMLDivElement> | undefined
  // ) => JSX.Element;
  // initialPoppedState?: "open" | "close";
  isLogged?: boolean;
  refresh: () => void;
}
interface UserPopoutState {
  // showPoppedElement: boolean;
}

/**
 * Component renders a popper and it's parent element
 * @component
 * @type {string | {firstName:string, lastName:string}} username
 * @type {((React.LegacyRef<HTMLDivElement>?, React.MouseEventHandler<HTMLDivElement>?)=>void)?} popperInitialElement -  that should open a popper upon clicking it.
 * @type {"open"|"close"} initialPoppedState
 * @type {string?} avatar
 */

export default class UserPopout extends React.Component<
  UserPopoutProps,
  UserPopoutState
> {
  refElement: any;

  constructor(props: UserPopoutProps) {
    super(props);
    // this.state = {
    //   showPoppedElement: this.props.initialPoppedState === "open",
    // };
    this.refElement = React.createRef();
  }

  /**
   * This method renders a singular menu item
   * @type {string?} itemName
   * @type {IconDefinition?} faIcon
   * @returns React Component
   */
  renderUserMenuItem(itemName: string, faIcon?: IconDefinition) {
    return (
      <li className="flex items-center gap-1 h-10 pl-3 pr-3 border-t-2 first:border-none even:border-blue-200 odd:border-blue-200 cursor-pointer hover:bg-blue-200 duration-150 font-semibold">
        {faIcon && <FontAwesomeIcon icon={faIcon} />}
        {itemName}
      </li>
    );
  }

  /**
   * This method renders a login card for when user is not logged in.
   */
  renderMenuLoginCard() {
    //TODO: add some cool image and button to log in/register
    // const buttonClass = "rounded-md border-2 duration-150 font-semibold";
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col gap-1">
          <p>Nie zalogowano</p>

          <PopupLogin refresh={this.props.refresh} />
          <PopupRegister />
        </div>
      </div>
    );
  }

  /**
   * This method renders a menu
   */
  renderMenu() {
    if (!this.props.user) return this.renderMenuLoginCard(); //? render login card if not already logged
    //! when testing change if
    return (
      <ul className="w-full">
        {this.renderUserMenuItem(
          typeof this.props.username === "string"
            ? this.props.username
            : `${this.props.username.firstName} ${this.props.username.lastName}`,
          faUser
        )}
        {this.renderUserMenuItem("B", faBookmark)}
        {this.renderUserMenuItem("B", faBookmark)}
      </ul>
    );
  }

  render() {
    return this.renderMenu();
    // return (
    //   <div>

    {
      /* <nav
        // ref={ref}
        // style={style}
        // data-placement={placement}
        // className="min-w-max w-full  sm:w-56 h-72 rounded-md border-2 border-blue-200 bg-gray-200 flex  mt-2  overflow-y-auto overflow-x-hidden shadow-md"
        >
          {this.renderMenu()}
        </nav> */
    }
    //     {/* <Popup trigger={this.props.popperInitialElement}>
    //       <div>TEST</div>
    //     </Popup> */}
    //     {/* <div>TEST</div> */}
    //     {/* <Manager>
    //       <Reference>
    //         {({ ref }) =>
    //           this.props.popperInitialElement &&
    //           this.props.popperInitialElement(ref, () => {
    //             this.setState((prevState) => ({
    //               showPoppedElement: !prevState.showPoppedElement,
    //             }));
    //           })
    //         }
    //       </Reference>
    //       {this.state.showPoppedElement ? (
    //         <Popper>
    //           {({ ref, style, placement, arrowProps }) => (
    //             <nav
    //               ref={ref}
    //               style={style}
    //               data-placement={placement}
    //               className="min-w-max w-full  sm:w-56 h-72 rounded-md border-2 border-blue-200 bg-gray-200 flex  mt-2  overflow-y-auto overflow-x-hidden shadow-md"
    //             >
    //               {this.renderMenu()}
    //             </nav>
    //           )}
    //         </Popper>
    //       ) : null}
    //     </Manager> */}
    //   </div>
    // );
  }
}
