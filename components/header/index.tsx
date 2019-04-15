import React, { useState } from 'react';
import { format } from 'date-fns';
import useInterval from '../../hooks/useInterval';
import { useFullscreen } from '../../hooks/useFullscreen';

const Header = () => {
  const isServer = typeof window === 'undefined';
  const [date, setDate] = useState(new Date());
  const { toggleFullscreen } = useFullscreen(!isServer ? document.body : null);

  useInterval(() => {
    setDate(new Date());
  }, 1000);

  const hour = date.getHours();
  const minute = date.getMinutes();

  return (
    <div
      className={`w-screen relative h-16 px-6 flex items-center double-border-bottom flex-no-shrink`}
      onClick={toggleFullscreen}
    >
      <span className="text-xl inline-block mr-6">
        {hour}
        <span className="blink-1">:</span>
        {minute}
      </span>
      <span className="text-xl">{format(date, 'dddd, Do MMMM')}</span>
    </div>
  );
};

export default Header;
