import React, { ReactNode, MouseEvent } from 'react';
import cn from 'classnames';
import { H3 } from 'components/text';

export interface Props {
  className?: string;
  children?: ReactNode;
  fit?: Boolean;
  padding?: Boolean;
  overflow?: Boolean;
  label?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

const Panel = ({
  className,
  children = null,
  fit = true,
  padding = true,
  overflow = true,
  onClick,
  label,
  ...props
}: Props) => {
  const classes = cn(className, 'bg-panel rounded', {
    'w-full': fit,
    'h-full': fit,
    'p-4': padding,
    'overflow-hidden': !overflow
  });

  const inner = !!label ? (
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow flex justify-center items-center">{children}</div>
      <H3 className="mb-0" margin={false}>
        Current humidity
      </H3>
    </div>
  ) : (
    children
  );

  return (
    <div onClick={onClick} className={classes} {...props}>
      {inner}
    </div>
  );
};

export default Panel;
