import React, { ReactNode } from 'react';
import cn from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
  color?: 'alt';
}

const Label = ({ children, color, className }: Props) => {
  const textClass = color === 'alt' ? 'text-grey-darker' : 'text-grey';

  return <label className={cn('block mb-2 uppercase text-xs', textClass, className)}>{children}</label>;
};

export default Label;
