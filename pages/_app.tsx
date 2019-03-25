import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'mobx-react';
import Store, { initializeStore } from '../store';
import SpotifyStore, { initializeSpotifyStore } from '../spotifyStore';
import '../styles/index.css';

class Thomas extends App {
  private store: Store;
  private spotifyStore: SpotifyStore;

  static async getInitialProps(appContext: any) {
    const store = initializeStore();
    const spotifyStore = initializeSpotifyStore();
    appContext.ctx.store = store;
    appContext.ctx.spotifyStore = spotifyStore;

    let appProps = await App.getInitialProps(appContext);

    return {
      ...appProps,
      initialStore: store,
      initialSpotifyStore: spotifyStore
    };
  }

  constructor(props: any) {
    super(props);
    const isServer = typeof window === 'undefined';
    this.store = isServer ? props.initialStore : initializeStore();
    this.spotifyStore = isServer ? props.initialSpotifyStore : initializeSpotifyStore();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={this.store} spotifyStore={this.spotifyStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default Thomas;
