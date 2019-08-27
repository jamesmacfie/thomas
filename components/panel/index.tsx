import React, { ReactNode, MouseEvent } from 'react';
import cn from 'classnames';

export interface Props {
  className?: string;
  children?: ReactNode;
  fit?: Boolean;
  padding?: Boolean;
  overflow?: Boolean;
  style?: any;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

const Panel = ({
  style,
  className,
  children,
  fit = true,
  padding = true,
  overflow = true,
  onClick,
  ...props
}: Props) => {
  const classes = cn(className, 'bg-panel rounded', {
    'w-full': fit,
    'h-full': fit,
    'p-4': padding,
    'overflow-hidden': !overflow
  });
  return (
    <div style={style} onClick={onClick} className={classes} {...props}>
      {children}
    </div>
  );
};

export default Panel;
