import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Auctionhouse</title>
      </Head>

      <ChakraProvider theme={theme}>
        <NextNProgress />
        <Component {...pageProps} />
      </ChakraProvider>
    </div>
  );
}
export default MyApp;
