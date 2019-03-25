import React from 'react';
import { inject, observer } from 'mobx-react';
import SpotifyLogin from 'react-spotify-login';
import SpotifyStore from '../../spotifyStore';
import Loader from '../../components/loader';
import PageWrapper from '../../components/pageWrapper';

interface Props {
  spotifyStore?: SpotifyStore;
}

const SpotifyAuth = ({ spotifyStore }: Props) => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return <Loader />;
  }

  if (!spotifyStore) return null;
  if (spotifyStore.hasProfile) {
    return <p>Yay!</p>;
  }
  const onSuccess = async (response: any) => {
    console.log(response);
    await spotifyStore.setAccessToken(response.access_token);
  };
  const onFailure = (response: any) => console.error(response);

  return (
    <PageWrapper title="Settings">
      <div className="flex">
        <div>
          <SpotifyLogin
            scope="user-read-currently-playing user-read-playback-state"
            clientId={process.env.SPOTIFY_CLIENT_ID}
            redirectUri={process.env.SPOTIFY_RETURN_URL}
            onSuccess={onSuccess}
            onFailure={onFailure}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default inject('spotifyStore')(observer(SpotifyAuth));
