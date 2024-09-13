import GlobalStyle from '@/styles/global';
import { NextIntlClientProvider } from 'next-intl';
import App, { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from "@/components/Layout/Layout";
import { setupStore } from "@/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps)
{
    const { locale } = useRouter();
    const store = setupStore();

    return (
        <NextIntlClientProvider locale={locale} messages={pageProps.messages}>
            <Provider store={store}>
                <Layout>
                    <GlobalStyle />
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </NextIntlClientProvider>
    );
}

MyApp.getInitialProps = async (appContext: AppContext) =>
{
    const appProps = await App.getInitialProps(appContext);
    return {
        ...appProps,
        pageProps: {
            ...appProps.pageProps,
            messages: (await import(`../translations/${appContext.router.locale}.json`)).default
        }
    };
};

export default MyApp;