import React, { ReactNode } from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
  children: ReactNode;
  fit?: Boolean;
  padding?: Boolean;
}

const Panel = ({ className, children, fit = true, padding = true }: Props) => {
  const classes = cn(className, 'bg-panel rounded', {
    'w-full': fit,
    'h-full': fit,
    'p-6': padding
  });
  return <div className={classes}>{children}</div>;
};

export default Panel;
