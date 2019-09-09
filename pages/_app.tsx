import React from 'react';
import App, { Container } from 'next/app';
import { useStaticRendering } from 'mobx-react-lite';
import fontawesome from '@fortawesome/fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import '../styles/index.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

fontawesome.library.add(fab, fas, far);

useStaticRendering(typeof window === 'undefined');

class Thomas extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default Thomas;
