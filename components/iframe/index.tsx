import React, { useState } from 'react';
import cn from 'classnames';
import Panel from '../panel';
import FullscreenButton from '../fullscreenButton';

interface Props {
  url: string;
  className?: string;
}

const Iframe = ({ url, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFullscreen = () => {
    setIsOpen(!isOpen);
  };
  const classes = isOpen ? 'absolute pin p-6' : 'relative';
  const onClick = isOpen ? toggleFullscreen : undefined;
  return (
    <Panel onClick={onClick} padding={false} className={cn(className, 'overflow-hidden', classes)}>
      <iframe className="h-full w-full rounded" src={url} />
      <FullscreenButton isOpen={isOpen} onClick={toggleFullscreen} />
    </Panel>
  );
};

export default Iframe;
