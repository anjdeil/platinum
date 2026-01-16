import Layout from '@/components/Layout/Layout';
import Maintenance from '@/components/Maintenance/Maintenance';
import MetaPixel from '@/components/metaPixel/MetaPixel';
import ProgressBar from '@/components/progressBar/ProgressBar';
import { setupStore } from '@/store';
import GlobalStyle from '@/styles/global';
import muiTheme from '@/styles/muiTheme';
import theme from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { NextIntlClientProvider } from 'next-intl';
import App, { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = setupStore();

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  // maintenance mode
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  if (isMaintenance) {
    console.log('MAINTENANCE MODE:', process.env.NEXT_PUBLIC_MAINTENANCE_MODE);

    return <Maintenance />;
  }

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={pageProps.messages}
      timeZone="America/New_York"
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <MuiThemeProvider theme={muiTheme}>
              <GlobalStyle />
              <Layout>
                <ProgressBar />
                <MetaPixel pixelId="2492032124476904" />
                <Component {...pageProps} />
              </Layout>
            </MuiThemeProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </NextIntlClientProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      messages: (
        await import(`../translations/${appContext.router.locale}.json`)
      ).default,
    },
  };
};

export default MyApp;
