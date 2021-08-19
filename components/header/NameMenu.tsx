import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import React from "react";
import { Manager, Popper, Reference } from "react-popper";
import Popup from "reactjs-popup";
import { simplifiedUser } from "../../types";
import UserPopout from "./UserPopout";

interface NameMenuProps {
  // name?: string;
  // avatar?: string;
  // isLogged?: boolean;
  user?: simplifiedUser;
  // token: string;
  //! podpytać czy ma sens wysyłanie tokenów
}
interface NameMenuState {
  popoutOpen: boolean;
}

export default class NameMenu extends React.Component<
  NameMenuProps,
  NameMenuState
> {
  constructor(props: NameMenuProps) {
    super(props);
    this.state = { popoutOpen: false };
  }

  renderName(): string {
    if (this.props.user) {
      return this.props.user.firstName + " " + this.props.user.lastName;
    }
    return "Zaloguj";
  }
  //   getAvatar(): string | null {
  //     if (this.props.avatar) return this.props.avatar;
  //     return null; //! placeholder
  //   }
  renderAvatar(): JSX.Element {
    //! later on might change for next/image
    if (this.props.avatar)
      return <img src={this.props.avatar} alt="Profilowe" />;
    return <FontAwesomeIcon icon={faUser} />;
  }

  /**
   * Method to toggle search box visibility
   * @param state - "open"|"close" - open or close, or toggle if not specified
   */
  changePopoutState(state?: "open" | "close"): void {
    //TODO make so that it has an animation on open

    if (state) {
      this.setState({ popoutOpen: state === "open" ? true : false });

      return;
    } else {
      this.setState((prevState) => ({ popoutOpen: !prevState.popoutOpen }));
    }
  }

  renderNameMenu(
    popperReference?: React.LegacyRef<HTMLDivElement>,
    onClickFunction?: React.MouseEventHandler<HTMLDivElement>
  ) {
    return (
      <div
        className="group hover:text-blue-700 border-2 hover:border-blue-200 duration-150 p-1 hover:bg-blue-100 rounded-full cursor-pointer flex gap-2 group items-center transition-all"
        ref={popperReference}
        onClick={onClickFunction}
      >
        {this.renderAvatar()}
        <p className="font-bold select-none">{this.renderName()}</p>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="cursor-pointer duration-150"
        />
      </div>
    );
  }
  render() {
    return (
      <div>
        <Popup
          nested
          {...{
            contentStyle: {
              borderRadius: "0.375rem",
              borderWidth: "2px",
              borderColor: "rgba(191, 219, 254,1)",
              backgroundColor: "rgba(229, 231, 235,1)",
              height: "18rem",
              // overflowX: "hidden",
            },
            arrowStyle: {
              color: "rgba(229, 231, 235,1)",
              // filter:"drop-shadow(0px -2px 0px rgba(191, 219, 254,1))"

              // borderWidth: "2px",
              stroke: "rgba(191, 219, 254,1)",
              // textShadow:""
            },
          }}
          // className="min-w-max w-full  sm:w-56 h-72 rounded-md border-2 border-blue-200 bg-gray-200 flex  mt-2  overflow-y-auto overflow-x-hidden shadow-md"
          trigger={this.renderNameMenu()}
        >
          <UserPopout username={this.renderName()} />
          {/* <div>LUL</div> */}
        </Popup>
        {/* <UserPopout
          username={this.renderName()}
          popperInitialElement={this.renderNameMenu.bind(this)}
          isLogged={this.props.isLogged}
        /> */}
      </div>
    );
  }
}
