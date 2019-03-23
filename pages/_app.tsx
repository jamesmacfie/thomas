import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'mobx-react';
import Store, { initializeStore } from '../store';
import '../styles/index.css';

class Thomas extends App {
  private store: Store;

  static async getInitialProps(appContext: any) {
    const store = initializeStore();
    appContext.ctx.store = store;

    let appProps = await App.getInitialProps(appContext);

    return {
      ...appProps,
      initialStore: store
    };
  }

  constructor(props: any) {
    super(props);
    const isServer = typeof window === 'undefined';
    this.store = isServer ? props.initialStore : initializeStore();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={this.store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default Thomas;
