import React from "react";
import Popup from "reactjs-popup";
import Login from "./login";
import Register from "./register";

export const PopupRegister: React.FC = ({}) => {
  return (
    <Popup
      modal
      trigger={
        <button
          className={`rounded-md border-2 duration-150 font-semibold border-red-200 bg-red-100 hover:bg-red-400 hover:border-red-500`}
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
