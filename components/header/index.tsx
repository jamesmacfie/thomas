import React, { useState } from 'react';
import moment from 'moment';
import useInterval from 'hooks/useInterval';

const Header = () => {
  const [date, setDate] = useState(moment());

  useInterval(() => {
    setDate(moment());
  }, 1000);

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
