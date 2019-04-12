import React, { useContext } from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import Panel from '../panel';
import Button from '../button';
import SpotifyStore from '../../spotifyStore';
import { SpotifyStoreContext } from '../../spotifyStore';

interface Props {
  className?: string;
}

const LoginLogoutButton = observer(() => {
  const store = useContext(SpotifyStoreContext) as SpotifyStore;
  const buttonText = store.status === 'AUTHENTICATED' ? 'Logout' : 'Login';
  const link = store.status === 'AUTHENTICATED' ? '/spotify/logout' : store.loginUrl;
  return (
    <Button type="primary">
      <Link href={link}>
        <a>{buttonText}</a>
      </Link>
    </Button>
  );
});

const SpotifyAccountPanel = ({ className }: Props) => {
  return (
    <Panel fit={false} className={cn(className, 'flex flex-col h-48 w-48')}>
      <div className="flex flex-grow justify-center items-center">
        <img className="w-20 h-20 rounded-full" src="/static/spotify-logo.jpg" />
      </div>
      <div className="flex justify-center">
        <LoginLogoutButton />
      </div>
    </Panel>
  );
};

export default SpotifyAccountPanel;
