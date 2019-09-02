import React from 'react';
import App, { Container } from 'next/app';
import { useStaticRendering } from 'mobx-react-lite';
import '../styles/index.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

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
    // try {
    //   if (getComputedStyle !== undefined) {
    //     console.log(parseFloat(getComputedStyle(document!.documentElement!).fontSize!));
    //   }
    // } catch (e) {
    //   console.log(e);
    // }

    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default Thomas;
