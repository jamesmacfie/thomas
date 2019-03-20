import React from 'react';
import Panel from '../panel';

interface Props {
  url: string;
}

const Iframe = ({ url }: Props) => {
  return (
    <Panel padding={false} className="overflow-hidden">
      <iframe className="h-full w-full" src={url} />
    </Panel>
  );
};

export default Iframe;
