import { AppProps } from "next/dist/shared/lib/router/router";
import "tailwindcss/tailwind.css";
import "/popupStyle.css";
import "/style.css";
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
