import React from 'react';
import cn from 'classnames';
import Panel from '../panel';

interface Props {
  className?: string;
}

const SpotifyAccountPanel = ({ className }: Props) => {
  return (
    <Panel fit={false} className={cn(className, 'h-48 w-48')}>
      <p>S</p>
    </Panel>
  );
};

export default SpotifyAccountPanel;
