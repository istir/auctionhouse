import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <head>
        <title>Auctionhouse</title>
      </head>

      <ChakraProvider theme={theme}>
        <NextNProgress />
        <Component {...pageProps} />
      </ChakraProvider>
    </div>
  );
}
export default MyApp;
