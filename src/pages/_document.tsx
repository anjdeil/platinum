import { Head, Html, Main, NextScript } from "next/document";
import Script from 'next/script';
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/4892edb3dd7351862d65495e/script.js"
          strategy="afterInteractive"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}