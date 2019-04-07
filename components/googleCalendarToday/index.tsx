import React, { useContext, useEffect } from 'react';
import Panel from '../panel';
import GoogleStore from '../../googleStore';
import { GoogleStoreContext } from '../../googleStore';

interface Props {
  className?: string;
}

const HomeAssistantAccountPanel = ({ className }: Props) => {
  const store = useContext(GoogleStoreContext) as GoogleStore;
  useEffect(() => {
    store.getThisMonthEvents().then((events: any) => {
      console.log('Events', events);
    });
  }, []);
  return (
    <Panel className={className}>
      <p>Calendar</p>
    </Panel>
  );
};

export default HomeAssistantAccountPanel;
