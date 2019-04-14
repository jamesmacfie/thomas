import React, { useContext } from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import Panel from '../panel';
import Button from '../button';
import GoogleStore from '../../googleStore';
import { GoogleStoreContext } from '../../googleStore';

interface Props {
  className?: string;
}

const LoginLogoutButton = observer(() => {
  const store = useContext(GoogleStoreContext) as GoogleStore;
  const buttonText = store.status === 'AUTHENTICATED' ? 'Logout' : 'Login';
  const link = store.status === 'AUTHENTICATED' ? '/google/logout' : store.loginUrl;
  return (
    <Button type="primary" padding={false}>
      <Link href={link}>
        <a className="px-6 py-2 inline-block">{buttonText}</a>
      </Link>
    </Button>
  );
});

const HomeAssistantAccountPanel = ({ className }: Props) => {
  return (
    <Panel fit={false} className={cn(className, 'flex flex-col h-48 w-48')}>
      <div className="flex flex-grow justify-center items-center">
        <img className="w-20 h-20 rounded-full" src="/static/google-logo.jpg" />
      </div>
      <div className="flex justify-center">
        <LoginLogoutButton />
      </div>
    </Panel>
  );
};

export default HomeAssistantAccountPanel;
