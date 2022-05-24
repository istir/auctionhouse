import {
  ButtonProps,
  Colors,
  ThemeConfig,
  extendTheme,
} from "@chakra-ui/react";
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
    "900": "#1c1c1c",
  },
  darkPink: {
    50: "#fcecf0",
    100: "#e5cdd1",
    200: "#d0adb2",
    300: "#bd8c94",
    400: "#ac6b76",
    500: "#92515d",
    600: "#724048",
    700: "#512d33",
    800: "#321a1f",
    900: "#160709",
  },
  bg: {
    0: "#f2f6f9",
    100: "#1c1c1c",
  },
  colors: {
    "bg-dark": "#1c1c1c",
    "bg-light": "#f2f6f9",
    "fg-dark": "#2c2c2c",
    "text-dark": "48484a",
    "fg-light": "#ffffff",
    "text-light": "#2d2d2d",
    "cta-light": "hsl(10, 54%, 52%)",
    "cta-dark": "hsl(10, 42%, 61%)",
    "cta-sec-dark": "#f2f2f2",
    "cta-sec-light": "#2c2c2c",
  },
  light: {
    primary: "#9C4145",
    primary1: "#faf1f5",
    primary2: "#f7ebee",
    primary3: "#f4e6e9",
    primary4: "#f2e3e7",
    primary5: "#f0e0e3",
    onPrimary: "#FFFFFF",
    primaryContainer: "#FFD9DA",
    onPrimaryContainer: "#400008",
    secondary: "#A6373B",
    secondary1: "#faf0f4",
    secondary2: "#f8ebee",
    secondary3: "#f5e4e8",
    secondary4: "#f4e2e5",
    secondary5: "#f1dee1",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#FFDAD7",
    onSecondaryContainer: "#410006",
    tertiary: "#96416A",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#FFD8E7",
    onTertiaryContainer: "#3E0023",
    error: "#B3261E",
    errorContainer: "#F9DEDC",
    onError: "#FFFFFF",
    onErrorContainer: "#410E0B",
    background: "#FFFBFE",
    onBackground: "#1C1B1F",
    surface: "#FFFBFE",
    onSurface: "#1C1B1F",
    surfaceVariant: "#E7E0EC",
    onSurfaceVariant: "#49454F",
    outline: "#79747E",
    inverseOnSurface: "#F4EFF4",
    inverseSurface: "#313033",
    inversePrimary: "#FFB3B4",
    shadow: "#000000",
    primaryInverse: "#FFB3B4",
  },
  dark: {
    primary: "#FFB3B4",
    primary1: "#282327",
    primary2: "#322b2f",
    primary3: "#383032",
    primary4: "#3b3134",
    primary5: "#3e3337",
    onPrimary: "#60131B",
    primaryContainer: "#7D2A2F",
    onPrimaryContainer: "#FFD9DA",
    secondary: "#FFB3B1",
    secondary1: "#2c282a",
    secondary2: "#322b2e",
    secondary3: "#383032",
    secondary4: "#3b3134",
    secondary5: "#3e3337",
    onSecondary: "#670513",
    secondaryContainer: "#862026",
    onSecondaryContainer: "#FFDAD7",
    tertiary: "#FFAFD1",
    onTertiary: "#5C113A",
    tertiaryContainer: "#782951",
    onTertiaryContainer: "#FFD8E7",
    error: "#F2B8B5",
    errorContainer: "#8C1D18",
    onError: "#601410",
    onErrorContainer: "#F9DEDC",
    background: "#1C1B1F",
    onBackground: "#E6E1E5",
    surface: "#1C1B1F",
    onSurface: "#E6E1E5",
    surfaceVariant: "#49454F",
    onSurfaceVariant: "#CAC4D0",
    outline: "#938F99",
    inverseOnSurface: "#1C1B1F",
    inverseSurface: "#E6E1E5",
    inversePrimary: "#9C4145",
    shadow: "#000000",
    primaryInverse: "#9C4145",
  },
  red: {
    50: "#FFF5F5",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#E53E3E",
    600: "#C53030",
    700: "#9B2C2C",
    800: "#822727",
    900: "#63171B",
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
      backgroundColor: mode("light.background", "dark.background")(props),
      color: mode("light.onBackground", "dark.onBackground")(props),
      transitionDuration: "0.2s",
      transitionProperty: "background-color",
    },
    body: { overflowY: "scroll" },
    // a: {
    //   color: "teal.500",
    // },
  }),
};
const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

//var(--chakra-colors-dark-primary3)
const components = {
  Button: {
    baseStyle: (props: { colorScheme: string } & ButtonProps) => ({
      _focus: {
        boxShadow:
          props.colorScheme === "dark" ||
          props.colorScheme === "light" ||
          props.colorScheme === "material"
            ? mode(
                `0 0 0 2px var(--chakra-colors-light-onPrimaryContainer)`,
                `0 0 0 2px var(--chakra-colors-dark-onPrimaryContainer)`
              )(props)
            : mode(
                `0 0 0 2px var(--chakra-colors-${props.colorScheme}-200)`,
                `0 0 0 2px var(--chakra-colors-${props.colorScheme}-500)`
              )(props),
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
                    props.colorScheme
                      ? `${props.colorScheme}.200`
                      : "colors.cta-dark"
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
      field: {
        _focus: {
          boxShadow: `0 0 0 0px var(--chakra-colors-${colorScheme}-200)`,
          background: "#000 !important",
        },
      },
    }),
    variants: {
      outline: (props: any) => ({
        field: {
          _focus: {
            boxShadow: `0 0 0 0px transparent`,
            bg: mode("blackAlpha.200", "whiteAlpha.200")(props),
          },
        },
      }),
    },
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
