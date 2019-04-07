import React, { useContext } from 'react';
import cn from 'classnames';
import Panel from '../panel';
import Button from '../button';
import Store from '../../store';
import { StoreContext } from '../../store';

interface Props {
  className?: string;
}

const LoginLogoutButton = ({ store }: { store: Store }) => {
  const buttonText = store.authenticated ? 'Logout' : 'Login';

  return <Button type="primary">{buttonText}</Button>;
};

const HomeAssistantAccountPanel = ({ className }: Props) => {
  const store = useContext(StoreContext) as Store;
  return (
    <Panel fit={false} className={cn(className, 'flex flex-col h-48 w-48')}>
      <div className="flex flex-grow justify-center items-center">
        <img className="w-20 h-20 rounded-full" src="/static/home-assistant-logo.jpg" />
      </div>
      <div className="flex justify-center">
        <LoginLogoutButton store={store} />
      </div>
    </Panel>
  );
};

export default HomeAssistantAccountPanel;
