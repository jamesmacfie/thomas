import React, { ReactNode } from 'react';
import cn from 'classnames';

type AlertType = 'ERROR' | 'INFO' | 'SUCCESS';
const typeClasses = {
  ERROR: 'bg-red-dark border-red-darker',
  INFO: 'bg-blue border-blue-dark',
  SUCCESS: 'bg-green border-green-dark'
};

interface Props {
  type: AlertType;
  children: ReactNode;
  className?: string;
}

const Alert = ({ type, children, className }: Props) => {
  const classes = cn(typeClasses[type], 'text-xs py-2 px-3 border rounded-sm ', className);

  return <div className={classes}>{children}</div>;
};

export default Alert;
