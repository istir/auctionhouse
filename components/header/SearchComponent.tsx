import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface SearchComponentProps {
  renderSearchIcon?: boolean;
  searchIconClass?: string;
}
interface SearchComponentState {
  searchOpen: boolean;
}

export default class SearchComponent extends React.Component<
  SearchComponentProps,
  SearchComponentState
> {
  constructor(props: SearchComponentProps) {
    super(props);
    this.state = { searchOpen: !this.props.renderSearchIcon }; //? open search box by default when not rendering search icon
  }
  /* -------------------------------------------------------------------------- */
  /*                                 SEARCH ICON                                */
  /* -------------------------------------------------------------------------- */
  renderSearchIcon() {
    if (this.props.renderSearchIcon)
      return (
        <FontAwesomeIcon
          className={this.props.searchIconClass}
          icon={faSearch}
          onClick={() => {
            this.changeSearchBoxState();
            //   universalClick("Search");
          }}
        />
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                                 SEARCH BOX                                 */
  /* -------------------------------------------------------------------------- */
  /* ---------------------------- toggle search box --------------------------- */
  /**
   *
   * Method to toggle search box visibility
   * @param state - "open"|"close" - open or close, or toggle if not specified
   
   */
  changeSearchBoxState(state?: "open" | "close"): void {
    //TODO make so that it has an animation on open

    if (state) {
      this.setState({ searchOpen: state === "open" ? true : false });

      return;
    } else {
      this.setState((prevState) => ({ searchOpen: !prevState.searchOpen }));
    }
  }

  /* --------------------------------- render --------------------------------- */
  renderSearchBox() {
    // if (!this.state.searchOpen) return;
    return (
      //TODO modify tailwind css later

      <input
        // onBlur={() => {
        //   this.changeSearchBoxState("close"); //? close search box when not selected
        // }}
        style={
          this.state.searchOpen
            ? { opacity: "1", visibility: "visible" }
            : { width: "0", opacity: "0", visibility: "hidden" }
        }
        className="w-204 duration-150 p-1 sm:p-2 text-lg sm:text-sm rounded-md focus:outline-none focus:ring-2"
      ></input>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                           FINAL COMPONENT RENDER                           */
  /* -------------------------------------------------------------------------- */
  render() {
    return (
      <div className="flex items-center gap-2">
        {this.renderSearchBox()}
        {this.renderSearchIcon()}
      </div>
    );
    // return <div>Hello World</div>;
  }
}
