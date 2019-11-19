import React from 'react';
import cn from 'classnames';
import Select from 'react-select';

interface Props {
  name?: string;
  values?: any;
  value?: any;
  onChange: (e: any) => void;
  className?: string;
}

const InputSelect = ({ name, value, values, onChange, className }: Props) => {
  return (
    <Select
      name={name}
      value={value}
      options={values}
      onChange={onChange}
      className={cn(className, 'mb-4 react-select-container')}
      classNamePrefix="react-select"
    />
  );
};

export default InputSelect;
