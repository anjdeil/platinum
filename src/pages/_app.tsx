import Layout from "@/components/Layout/Layout";
import { setupStore } from "@/store";
import GlobalStyle from '@/styles/global';
import muiTheme from "@/styles/muiTheme";
import theme from '@/styles/theme';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { NextIntlClientProvider } from 'next-intl';
import App, { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from "react-redux";
import { ThemeProvider } from '@emotion/react';


function MyApp({ Component, pageProps }: AppProps)
{
    const { locale } = useRouter();
    const store = setupStore();

    return (
        <NextIntlClientProvider locale={locale} messages={pageProps.messages}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <MuiThemeProvider theme={muiTheme}>
                        <GlobalStyle />
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </MuiThemeProvider>
                </ThemeProvider>
            </Provider >
        </NextIntlClientProvider >
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