import React from "react";
import { Color } from "../../types";

export type ColorScheme = {
  // IsLightMode: () => boolean;
  color: Color;
  setColor: (color: Color) => void;
};

let currentColor = "red";
function setColor(color: Color): void {
  currentColor = color;
}

const useColorSchemeContext = React.createContext({
  // IsLightMode,
  color: currentColor,
  setColor: setColor.bind(this),
});

export default useColorSchemeContext;
// export const useColorSchemeContext = () => useContext(colorSchemeContext);
