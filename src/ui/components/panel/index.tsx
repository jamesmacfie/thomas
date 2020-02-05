import React, { ReactNode, MouseEvent } from 'react';
import cn from 'classnames';
import { pick } from 'lodash';
import { H3 } from 'components/text';
import './styles.css';

export interface Props {
  className?: string;
  children?: ReactNode;
  fit?: Boolean;
  padding?: Boolean;
  overflow?: Boolean;
  label?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

// Would be nicer to get a better list of props that are explicitly allows on an
// HTML element.
const propsToRemove = ['x', 'y', 'h', 'w', 'minH', 'minW'];

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
  const classes = cn(className, 'panel rounded', {
    'w-full': fit,
    'h-full': fit,
    'p-4': padding,
    'overflow-hidden': !overflow
  });

  const inner = !!label ? (
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow flex justify-center items-center">{children}</div>
      <H3 className="mb-0" margin={false}>
        {label}
      </H3>
    </div>
  ) : (
    children
  );

  const allowedProps = pick(props, Object.keys(propsToRemove));
  return (
    <div onClick={onClick} className={classes} {...allowedProps}>
      {inner}
    </div>
  );
};

export default Panel;
