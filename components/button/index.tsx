import React, { ReactNode } from 'react';
import cn from 'classnames';

interface Props {
  children: ReactNode;
  onClick?: (e: Event) => void;
  className?: string;
  type: 'primary' | 'secondary' | 'danger';
}

const typeClasses = {
  primary: 'bg-blue border-blue-dark hover:bg-blue-dark hover:border-blue',
  secondary: 'bg-white',
  danger: 'bg-red'
};

const Button = ({ children, type, className }: Props) => {
  const classes = cn(
    'text-xs uppercase font-bold rounded-full px-6 py-2 leading-normal border text-white',
    typeClasses[type],
    className
  );
  return <button className={classes}>{children}</button>;
};

export default Button;
