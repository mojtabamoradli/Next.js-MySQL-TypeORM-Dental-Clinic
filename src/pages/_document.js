import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fa-IR" dir="rtl">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <link href="" rel="canonical" />
        <meta name="theme-color" content="#D2D2D2" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
