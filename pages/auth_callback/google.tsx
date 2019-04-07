import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Router from 'next/router';
import PageWrapper from '../../components/pageWrapper';
import Loader from '../../components/loader';
import GoogleStore from '../../googleStore';
import { GoogleStoreContext } from '../../googleStore';

const SpotifyAuth = observer(() => {
  const googleStore = useContext(GoogleStoreContext) as GoogleStore;
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return null;
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    googleStore.setAccessToken(code as string);
  }, []);

  if (googleStore.status === 'ERROR') {
    return <p>Shit, error</p>;
  }

  if (googleStore.status === 'AUTHENTICATED') {
    Router.push('/settings/spotify');
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
