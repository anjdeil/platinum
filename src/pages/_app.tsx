import GlobalStyle from '@/styles/global';
import { NextIntlClientProvider } from 'next-intl';
import App, { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from "@/components/Layout/Layout";
import { setupStore } from "@/store";
import { Provider } from "react-redux";
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';

function MyApp({ Component, pageProps }: AppProps)
{
    const { locale } = useRouter();
    const store = setupStore();

    return (
        <NextIntlClientProvider locale={locale} messages={pageProps.messages}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Layout>
                        <GlobalStyle />
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
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