import GlobalStyle from '@/styles/global';
import { NextIntlClientProvider } from 'next-intl';
import App, { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
    const { locale } = useRouter();

    return (
        <NextIntlClientProvider locale={locale} messages={pageProps.messages}>
            <GlobalStyle />
            <Component {...pageProps} />
        </NextIntlClientProvider>
    );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
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