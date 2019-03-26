import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import SpotifyStore from '../../spotifyStore';
import { withRouter } from 'next/router';
import PageWrapper from '../../components/pageWrapper';
import Loader from '../../components/loader';

interface Props {
  spotifyStore?: SpotifyStore;
}

const SpotifyAuth = ({ spotifyStore }: Props) => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return <Loader />;
  }

  if (!spotifyStore) return null;
  // TODO - this is a bit shitty
  const accessToken = window.location.href.match(new RegExp(`#access_token=(.*)&token_type`));
  if (!accessToken || !accessToken.length) {
    return <Loader />;
  }

  useEffect(() => {
    const setAccessToken = async () => {
      const tokenString = accessToken[0].replace('#access_token=', '').replace('&token_type', '');
      spotifyStore.setAccessToken(tokenString);
    };
    setAccessToken();
  });

  if (spotifyStore.status === 'ERROR') {
    return <p>Shit, error</p>;
  }

  if (spotifyStore.status !== 'AUTHENTICATED') {
    return <Loader />;
  }

  return (
    <PageWrapper title="Settings">
      <div className="flex">
        <div>
          <p>ok!</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default inject('spotifyStore')(observer(withRouter(SpotifyAuth)));
