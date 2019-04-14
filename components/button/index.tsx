import React, { ReactNode } from 'react';
import cn from 'classnames';

interface Props {
  children: ReactNode;
  onClick?: (e: Event) => void;
  className?: string;
  padding?: Boolean;
  type: 'primary' | 'secondary' | 'danger';
}

const typeClasses = {
  primary: 'bg-blue border-blue-dark hover:bg-blue-dark hover:border-blue',
  secondary: 'bg-white',
  danger: 'bg-red'
};

const Button = ({ children, type, className, padding = true }: Props) => {
  const classes = cn(
    'text-xs uppercase font-bold rounded-full leading-normal border text-white',
    { 'px-6 py-2': padding },
    typeClasses[type],
    className
  );
  return <button className={classes}>{children}</button>;
};

export default Button;
