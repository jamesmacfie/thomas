import Document, { Head, Main, NextScript } from 'next/document';

export default class PageDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/styles.css" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="manifest" href="/static/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
