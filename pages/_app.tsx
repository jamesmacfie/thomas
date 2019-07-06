import React from 'react';
import App, { Container } from 'next/app';
import { initializeStore } from '../store';
import { initializeSpotifyStore } from '../spotifyStore';
import { initializeGoogleStore } from '../googleStore';
import sentry from '../utils/sentry';
import '../styles/index.css';

const { captureException } = sentry();

class Thomas extends App {
  constructor(props: any) {
    super(props);
    const isServer = typeof window === 'undefined';
    if (!isServer) {
      initializeStore();
      initializeSpotifyStore();
      initializeGoogleStore();
    }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
    const errorEventId = captureException(error, { errorInfo });

    // Store the event id at this point as we don't have access to it within
    // `getDerivedStateFromError`.
    this.setState({ errorEventId });
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
