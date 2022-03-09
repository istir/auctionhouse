import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      id="everything-container"
      // style={{
      //   transform: "translateX(0)",
      //   position: "absolute",
      //   transition: "0.3s",
      //   overflowX: "hidden",
      //   overflowY: "visible",
      // }}
    >
      <div
        id="everything-container-black-out"
        style={{ overflowX: "hidden", overflowY: "visible" }}
      >
        <ChakraProvider theme={theme}>
          <NextNProgress />
          <Component {...pageProps} />
        </ChakraProvider>
      </div>
    </div>
  );
}
export default MyApp;
