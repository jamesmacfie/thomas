import React from 'react';
import cn from 'classnames';
import Select, { components as cmps } from 'react-select';
import { Props } from 'react-select/src/Select';

const InputSelect = ({ className, ...props }: Props) => {
  return <Select classNamePrefix="react-select" className={cn(className, 'mb-4 react-select-container')} {...props} />;
};

export const components = cmps;
export default InputSelect;
