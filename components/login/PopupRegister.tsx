import React from "react";
import Popup from "reactjs-popup";
import Login from "./login";
import Register from "./register";

export const PopupRegister: React.FC = ({}) => {
  return (
    <Popup
      modal
      className="popup-modal"
      {...{
        contentStyle: {
          borderRadius: "0.375rem",
          borderWidth: "2px",
          borderColor: "rgba(191, 219, 254,1)",
          minWidth: "fit-content",
        },
      }}
      trigger={
        <button
          className={`rounded-md border-2 duration-150 font-semibold border-red-200 bg-red-100 hover:bg-red-400 hover:border-red-500 `}
        >
          Zarejestruj
        </button>
      }
    >
      <Register />
    </Popup>
  );
};
export default PopupRegister;
