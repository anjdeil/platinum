import Layout from "@/components/Layout/Layout";
import { setupStore } from "@/store";
import GlobalStyle from '@/styles/global';
import muiTheme from "@/styles/muiTheme";
import theme from '@/styles/theme';
import { ThemeProvider } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { NextIntlClientProvider } from 'next-intl';
import App, { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps)
{
    const { locale } = useRouter();
    const store = setupStore();
    const [messages, setMessages] = useState(pageProps.messages);

    useEffect(() =>
    {
        const loadMessages = async () =>
        {
            const messages = (await import(`../translations/${locale}.json`)).default;
            setMessages(messages);
        };

        loadMessages();
    }, [locale]);

    return (
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Berlin">
            <Provider store={store}>
                    <MuiThemeProvider theme={muiTheme}>
                <ThemeProvider theme={theme}>
                        <GlobalStyle />
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                </ThemeProvider>
                    </MuiThemeProvider>
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