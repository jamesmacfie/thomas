import React, { useState } from 'react';
import moment from 'moment';
import { useDevice } from 'stores/devices/hooks';
import useInterval from 'hooks/useInterval';

const Header = () => {
  const [date, setDate] = useState(moment());
  const device = useDevice();
  useInterval(() => {
    setDate(moment());
  }, 1000);

  if (!device || !device.config.showHeader) {
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
};

export default Header;
