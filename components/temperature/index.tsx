import React from 'react';
import Entity from '../entity';
import { Props as EntityProps } from '../entity';

const Temperature = ({ title = 'Temperature', ...props }: EntityProps) => {
  return <Entity title={title} {...props} />;
};

export default Temperature;
