import GlobalStyle from "@/styles/global";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps)
{
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )

}
