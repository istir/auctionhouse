import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface NameMenuProps {
  name?: string;
  avatar?: string;
  //! podpytać czy ma sens wysyłanie tokenów
}
interface NameMenuState {}

export default class NameMenu extends React.Component<
  NameMenuProps,
  NameMenuState
> {
  renderName(): string {
    if (this.props.name) {
      return this.props.name;
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

  render() {
    return (
      <div
        className="group hover:text-blue-900 border-2 hover:border-blue-200 duration-150 p-1 hover:bg-blue-100 rounded-full cursor-pointer flex gap-2 group items-center transition-all"
        onClick={() => {
          console.info("Clicked! User Info");
        }}
      >
        {this.renderAvatar()}
        <p className="font-bold">{this.renderName()}</p>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="cursor-pointer duration-150"
        />
      </div>
    );
  }
}
