import React, { useContext } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import Panel from '../panel';
import Button from '../button';
import GoogleStore from '../../googleStore';
import { GoogleStoreContext } from '../../googleStore';

interface Props {
  className?: string;
}

const LoginLogoutButton = ({ store }: { store: GoogleStore }) => {
  const buttonText = store.status === 'AUTHENTICATED' ? 'Logout' : 'Login';
  const link = store.status === 'AUTHENTICATED' ? '/google/logout' : store.loginUrl;
  return (
    <Button type="primary">
      <Link href={link}>
        <a>{buttonText}</a>
      </Link>
    </Button>
  );
};

const HomeAssistantAccountPanel = ({ className }: Props) => {
  const store = useContext(GoogleStoreContext) as GoogleStore;
  return (
    <Panel fit={false} className={cn(className, 'flex flex-col h-48 w-48')}>
      <div className="flex flex-grow justify-center items-center">
        <img className="w-20 h-20 rounded-full" src="/static/google-logo.jpg" />
      </div>
      <div className="flex justify-center">
        <LoginLogoutButton store={store} />
      </div>
    </Panel>
  );
};

export default HomeAssistantAccountPanel;
