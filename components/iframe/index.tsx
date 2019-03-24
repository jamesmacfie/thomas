import React, { useState } from 'react';
import Panel from '../panel';
import FullscreenButton from '../fullscreenButton';

interface Props {
  url: string;
}

const Iframe = ({ url }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFullscreen = () => {
    setIsOpen(!isOpen);
  };
  const classes = isOpen ? 'absolute pin p-6' : 'relative';
  const onClick = isOpen ? toggleFullscreen : undefined;
  return (
    <Panel onClick={onClick} padding={false} className={`overflow-hidden ${classes}`}>
      <iframe className="h-full w-full rounded" src={url} />
      <FullscreenButton isOpen={isOpen} onClick={toggleFullscreen} />
    </Panel>
  );
};

export default Iframe;
