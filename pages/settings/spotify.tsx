import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import PageWrapper from '../../components/pageWrapper';
import SpotifyStore from '../../spotifyStore';
import { SpotifyStoreContext } from '../../spotifyStore';

const LoginToSpotifyButton = observer(() => {
  const spotifyStore = useContext(SpotifyStoreContext) as SpotifyStore;
  return (
    <Link href={spotifyStore.loginUrl}>
      <a>Login</a>
    </Link>
  );
});

const SpotifySettings = observer(() => {
  const spotifyStore = useContext(SpotifyStoreContext) as SpotifyStore;

  const inner = spotifyStore.status !== 'AUTHENTICATED' ? <LoginToSpotifyButton /> : <p>You're good to go!</p>;
  return (
    <PageWrapper title="Settings">
      <div className="flex">{inner}</div>
    </PageWrapper>
  );
});

export default SpotifySettings;
