import React, { useContext } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import Panel from '../panel';
import Button from '../button';
import Store from '../../store';
import { StoreContext } from '../../store';

interface Props {
  className?: string;
}

const LoginLogoutButton = observer(() => {
  const store = useContext(StoreContext) as Store;
  const buttonText = store.status === 'AUTHENTICATED' ? 'Logout' : 'Login';
  const link = store.status === 'AUTHENTICATED' ? '/homeassistant/logout' : store.loginUrl;
  console.log(link);
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
        <img className="w-20 h-20 rounded-full" src="/static/home-assistant-logo.jpg" />
      </div>
      <div className="flex justify-center">
        <LoginLogoutButton />
      </div>
    </Panel>
  );
};

export default HomeAssistantAccountPanel;
