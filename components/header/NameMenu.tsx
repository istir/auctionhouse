import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import React from "react";
import { Manager, Popper, Reference } from "react-popper";
import UserPopout from "./UserPopout";

interface NameMenuProps {
  // name?: string;
  // avatar?: string;
  // isLogged?: boolean;
  user?: User;
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
        <UserPopout
          username={this.renderName()}
          popperInitialElement={this.renderNameMenu.bind(this)}
          isLogged={this.props.isLogged}
        />
      </div>
    );
  }
}
