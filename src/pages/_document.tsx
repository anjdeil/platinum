import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
// import Script from 'next/script';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx.locale || 'pl' };
  }

  render() {
    const { locale } = this.props as any;

    return (
      <Html lang={locale || 'pl'}>
        <Head>
          {/*<Script*/}
          {/*  id="cookieyes"*/}
          {/*  type="text/javascript"*/}
          {/*  src="https://cdn-cookieyes.com/client_data/4892edb3dd7351862d65495e/script.js"*/}
          {/*  strategy="afterInteractive"*/}
          {/*/>*/}
          {/* GTM */}
          {/*<Script id="gtm" strategy="afterInteractive">*/}
          {/*  {`*/}
          {/*    (function(w,d,s,l,i){w[l]=w[l]||[];*/}
          {/*      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});*/}
          {/*      var f=d.getElementsByTagName(s)[0],*/}
          {/*      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';*/}
          {/*      j.async=true;*/}
          {/*      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;*/}
          {/*      f.parentNode.insertBefore(j,f);*/}
          {/*    })(window,document,'script','dataLayer','GTM-NLKVWGD8');*/}
          {/*  `}*/}
          {/*</Script>*/}
        </Head>
        <body>
          {/* GTM noscript iframe */}
          {/*<noscript>*/}
          {/*  <iframe*/}
          {/*    title="Google Tag Manager"*/}
          {/*    src="https://www.googletagmanager.com/ns.html?id=GTM-NLKVWGD8"*/}
          {/*    height="0"*/}
          {/*    width="0"*/}
          {/*    style={{ display: 'none', visibility: 'hidden' }}*/}
          {/*  ></iframe>*/}
          {/*</noscript>*/}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
