import React from "react";
import Popup from "reactjs-popup";
import Login from "./login";

interface PopupLoginProps {
  refresh: () => void;
}

export const PopupLogin: React.FC<PopupLoginProps> = (
  props: PopupLoginProps
) => {
  return (
    <Popup
      modal
      {...{
        contentStyle: {
          borderRadius: "0.375rem",
          borderWidth: "2px",
          borderColor: "rgba(191, 219, 254,1)",
          minWidth: "fit-content",
        },
      }}
      className="popup-modal"
      trigger={
        <button
          className={`rounded-md border-2 duration-150 font-semibold border-blue-200 bg-blue-100  hover:bg-blue-400 hover:border-blue-500 `}
        >
          Zaloguj
        </button>
      }
    >
      <Login refresh={props.refresh} />
    </Popup>
  );
};
export default PopupLogin;
