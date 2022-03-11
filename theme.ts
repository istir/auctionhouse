import { Colors, ThemeConfig, extendTheme } from "@chakra-ui/react";
import { Styles, mode } from "@chakra-ui/theme-tools";
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
  global: (props) => ({
    "html, body": {
      // color: isLight()?"gray.":"white",
      // lineHeight: "tall",
      backgroundColor: mode("gray.50", "gray.900")(props),
      transitionDuration: "0.2s",
      transitionProperty: "background-color",
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
    variants: {
      pill: (props: {
        promo: "true" | "false";
        bg: string;
        transparent?: "true" | "false";
        colorScheme?: string;
      }) => ({
        borderRadius: "full",
        WebkitTapHighlightColor: "transparent",

        bg: props.bg
          ? props.bg
          : mode(
              props.promo === "true"
                ? "red.100"
                : `${
                    props.colorScheme ? `${props.colorScheme}.200` : "gray.50"
                  }`,
              props.promo === "true"
                ? "red.900"
                : `${props.colorScheme ? props.colorScheme : "gray"}.700`
            )(props),
        shadow: "md",
        my: "2",
        // outline: "5px solid transparent",
        // outlineOffset: "0",
        transitionProperty: "box-shadow background-color",
        _hover: {
          boxShadow: `0 0 0 5px var(--chakra-colors-${mode(
            props.promo === "true"
              ? "red-200"
              : props.transparent === "false"
              ? "black-300"
              : "blackAlpha-300",
            props.promo === "true"
              ? "red-800"
              : props.transparent === "false"
              ? "white-500"
              : "whiteAlpha-500"
          )(props)}) `,
          // borderColor: "#fff",
          // outline: `5px solid
          // var(--chakra-colors-${mode("white", "gray-800")(props)})
          // `,
          bg: props.bg
            ? props.bg
            : mode(
                props.promo === "true"
                  ? "red.200"
                  : props.transparent === "false"
                  ? "black.300"
                  : "blackAlpha.300",
                props.promo === "true"
                  ? "red.800"
                  : props.transparent === "false"
                  ? "white.500"
                  : "whiteAlpha.500"
              )(props),
        },
      }),
      transparent: (props: any) => ({
        filter: `drop-shadow(0px 0px 1px var(--chakra-colors-gray-${mode(
          "200",
          "900"
        )(props)}))`,
        // css: {
        WebkitTapHighlightColor: "transparent",
        // },
        className: "no-tap",
        _hover: {
          color: mode("gray.600", "gray.200")(props),
          boxShadow: "none",
        },
        _active: {
          boxShadow: "none",
        },
        _focus: {
          boxShadow: "none",
        },
        _focusWithin: {
          boxShadow: "none",
        },
      }),
    },
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
