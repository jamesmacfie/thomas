import React, { ReactNode } from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
  children: ReactNode;
  fit?: Boolean;
  padding?: Boolean;
  overflow?: Boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

const Panel = ({ className, children, fit = true, padding = true, overflow = true, onClick }: Props) => {
  const classes = cn(className, 'bg-panel rounded', {
    'w-full': fit,
    'h-full': fit,
    'p-6': padding,
    'overflow-hidden': !overflow,
    'cursor-pointer': !onClick
  });
  return (
    <div onClick={onClick} className={classes}>
      {children}
    </div>
  );
};

export default Panel;
