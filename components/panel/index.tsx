import React, { ReactNode, CSSProperties } from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
  children?: ReactNode;
  fit?: Boolean;
  padding?: Boolean;
  overflow?: Boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  style?: CSSProperties;
}

const Panel = ({ className, children, fit = true, padding = true, overflow = true, onClick, style }: Props) => {
  const classes = cn(className, 'bg-panel rounded', {
    'w-full': fit,
    'h-full': fit,
    'p-4': padding,
    'overflow-hidden': !overflow,
    'cursor-pointer': !onClick
  });
  return (
    <div style={style} onClick={onClick} className={classes}>
      {children}
    </div>
  );
};

export default Panel;
