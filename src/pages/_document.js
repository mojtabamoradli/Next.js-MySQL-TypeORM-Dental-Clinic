import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fa-IR" dir="rtl">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="Mojtaba Moradli" />
        <meta
          name="description"
          content="Mojtaba Moradli | Frontend Engineer"
        />
        <meta
          name="keywords"
          content="Engineering, Web Development, Frontend, Software, Programming, React.js, Next.js, Node.js, JavaScript, Moradli, mojtabamoradli"
        />
        <link href="https://mojtabamoradli.ir/" rel="canonical" />
        <meta name="theme-color" content="#D2D2D2" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="icon"
          href="mojtabamoradli-favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="mojtabamoradli-apple-touch-icon.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
