import React from 'react';
import auto from './svgs/auto.svg';
import quiet from './svgs/quiet.svg';
import low from './svgs/low.svg';
import med from './svgs/med.svg';
import high from './svgs/high.svg';
import strong from './svgs/strong.svg';
import { H3 } from 'components/text';

interface Props {
  onClick: (mode: string) => void;
  mode: string;
}

type FanMode = {
  name: string;
  src: string;
};

const fanModes: { [key: string]: FanMode } = {
  auto: {
    name: 'auto',
    src: auto
  },
  quiet: {
    name: 'Quiet',
    src: quiet
  },
  low: {
    name: 'Low',
    src: low
  },
  medium: {
    name: 'Med',
    src: med
  },
  high: {
    name: 'High',
    src: high
  },
  strong: {
    name: 'Strong',
    src: strong
  }
};

const getNextMode = (currentMode: string) => {
  const modeArray = Object.keys(fanModes);
  const index = modeArray.indexOf(currentMode);
  const nextIndex = index + 1 > modeArray.length - 1 ? 0 : index + 1;
  return modeArray[nextIndex];
};

const Fan = ({ onClick, mode }: Props) => {
  const currentMode = fanModes[mode] || fanModes.auto;

  return (
    <>
      <div className="flex-grow" onClick={() => onClick(getNextMode(mode))}>
        <img src={currentMode.src} alt="Fan mode" className="mt-2 w-10 h-10" />
      </div>
      <H3 className="mb-0 mt-2" margin={false}>
        {currentMode.name}
      </H3>
    </>
  );
};

export default Fan;
