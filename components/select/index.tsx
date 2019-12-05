import React from 'react';
import cn from 'classnames';
import Select from 'react-select';
import { SelectComponents } from 'react-select/src/components';

interface Props {
  menuIsOpen?: boolean;
  name?: string;
  values?: any;
  value?: any;
  onChange: (e: any) => void;
  className?: string;
  components?: Partial<SelectComponents<any>>;
  options?: {
    value: string;
    label: string;
  }[];
}

const InputSelect = ({ className, ...props }: Props) => {
  return <Select classNamePrefix="react-select" className={cn(className, 'mb-4 react-select-container')} {...props} />;
};

export default InputSelect;
