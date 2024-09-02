import Layout from "@/components/Layout/Layout";
import { setupStore } from "@/store";
import GlobalStyle from "@/styles/global";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps)
{
  const store = setupStore();

  return (
    <Provider store={store}>
      <Layout>
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )

}
