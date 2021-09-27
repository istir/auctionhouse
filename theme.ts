import { Colors, ThemeConfig, extendTheme } from "@chakra-ui/react";
import { Styles } from "@chakra-ui/theme-tools";
// import isLight from "./libs/isLightMode";
// const customTheme:Theme {
//   ...
// }

// const components ={
//   NavBar: {

//   }
// }
const colors: Colors = {
  gray: {
    "50": "#F2F2F2",
    "100": "#DBDBDB",
    "200": "#C4C4C4",
    "300": "#ADADAD",
    "400": "#969696",
    "500": "#808080",
    "600": "#666666",
    "700": "#4D4D4D",
    "800": "#333333",
    "900": "#1A1A1A",
  },
};

const shadows = {
  // outline: "0 0 0 2px " + mode("red.500", "gray.900"),
};

const styles: Styles = {
  global: () => ({
    "html, body": {
      // color: isLight()?"gray.":"white",
      // lineHeight: "tall",
      // backgroundColor: mode("gray.50", "gray.900")(props),
    },

    // a: {
    //   color: "teal.500",
    // },
  }),
};
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const components = {
  Button: {
    baseStyle: ({ colorScheme }: { colorScheme: string }) => ({
      _focus: {
        boxShadow: `0 0 0 3px var(--chakra-colors-${colorScheme}-200)`,
      },
    }),
  },
  Input: {
    baseStyle: ({ colorScheme }: { colorScheme: string }) => ({
      _focus: {
        boxShadow: `0 0 0 2px var(--chakra-colors-${colorScheme}-200)`,
      },
    }),
  },
  Select: {
    baseStyle: ({ colorScheme }: { colorScheme: string }) => ({
      _focus: {
        boxShadow: `0 0 0 20px var(--chakra-colors-${colorScheme}-200)`,
      },
    }),
  },
  // Flex: {
  //   baseStyle: ({ colorScheme }: { colorScheme: string }) => ({
  //     // _hover: {
  //     //   backgroundColor: `rgba(0,0,0,0.5)`,
  //     // },
  //     backgroundColor: `rgba(0,0,0,0.5)`,
  //   }),
  // },
  // Input: {
  //   variants: {
  //     correctOutline: {
  //       _focus: {boxShadow:}
  //     }
  //   }
  //   baseStyle: {
  //     track: {
  //       _focus: {
  //         boxShadow: "0 0 0 1px " + mode("gray.50", "gray.900"),
  //       },
  //     },
  //   },
  //   Switch: {
  //     baseStyle: {
  //       track: {
  //         _focus: {
  //           boxShadow: "0 0 0 1px " + mode("gray.50", "gray.900"),
  //         },
  //       },
  //     },
  //   },
  // },
};
const theme = extendTheme({ colors, styles, config, shadows, components });
export default theme;
