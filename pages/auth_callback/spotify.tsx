import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Router from 'next/router';
import PageWrapper from '../../components/pageWrapper';
import Loader from '../../components/loader';
import SpotifyStore from '../../spotifyStore';
import { SpotifyStoreContext } from '../../spotifyStore';

const SpotifyAuth = observer(() => {
  const spotifyStore = useContext(SpotifyStoreContext) as SpotifyStore;
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return null;
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    spotifyStore.getAccessToken(code as string);
  }, []);

  if (spotifyStore.status === 'ERROR') {
    return <p>Shit, error</p>;
  }

  if (spotifyStore.status === 'AUTHENTICATED') {
    Router.push('/settings/accounts');
  }

  return (
    <PageWrapper title="Settings">
      <div className="flex">
        <Loader />;
      </div>
    </PageWrapper>
  );
});

export default SpotifyAuth;
