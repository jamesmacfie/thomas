import React, { ReactNode } from 'react';
import cn from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
}

const Label = ({ children, className }: Props) => {
  return <label className={cn('block mb-2 uppercase text-xs text-grey', className)}>{children}</label>;
};

export default Label;
