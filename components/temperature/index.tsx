import React from 'react';
import Entity from '../entity';
import HistoryLine from '../historyLine';
import { Props as EntityProps } from '../entity';

const Temperature = ({ title = 'Temperature', ...props }: EntityProps) => {
  return (
    <>
      <Entity title={title} {...props} />
      <HistoryLine />
    </>
  );
};

export default Temperature;
