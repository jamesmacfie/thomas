import React, { useState, useContext } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { StoreContext as DevicesStoreContext } from 'stores/devices';
import useInterval from 'hooks/useInterval';

const Header = observer(() => {
  const [date, setDate] = useState(moment());
  const deviceStore = useContext(DevicesStoreContext);
  useInterval(() => {
    setDate(moment());
  }, 1000);

  if (!deviceStore.device || !deviceStore.device.config.showHeader) {
    return <div className="h-4" />;
  }

  const hours = date.format('HH');
  const minutes = date.format('mm');

  return (
    <div className={`w-screen relative h-16 px-6 flex items-center double-border-bottom flex-shrink-0`}>
      <span className="text-xl inline-block mr-6">
        {hours}
        <span className="blink-1">:</span>
        {minutes}
      </span>
      <span className="text-xl">{date.format('dddd, Do MMMM')}</span>
    </div>
  );
});

export default Header;
