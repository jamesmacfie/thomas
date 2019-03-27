import React from 'react';
import App, { Container } from 'next/app';
import { initializeStore } from '../store';
import { initializeSpotifyStore } from '../spotifyStore';
import '../styles/index.css';

class Thomas extends App {
  constructor(props: any) {
    super(props);
    const isServer = typeof window === 'undefined';
    if (!isServer) {
      initializeStore();
      initializeSpotifyStore();
    }
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
