import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      id="everything-container"
      style={{
        transform: "translateX(0)",
        position: "absolute",
        transition: "0.3s",
        overflow: "visible",
      }}
    >
      <div id="everything-container-black-out">
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </div>
    </div>
  );
}
export default MyApp;
