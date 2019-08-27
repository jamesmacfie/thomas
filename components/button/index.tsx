import React, { ReactNode } from 'react';
import cn from 'classnames';

interface Props {
  children: ReactNode;
  disabled?: boolean;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  className?: string;
  padding?: Boolean;
  type: 'primary' | 'secondary' | 'danger';
}

const typeClasses = {
  primary: 'bg-blue border-blue-dark hover:bg-blue-dark hover:border-blue',
  secondary: 'bg-transparent border-white hover:text-blue hover:border-blue',
  danger: 'bg-red'
};

const Button = ({ children, type, className, padding = true, disabled = false, onClick }: Props) => {
  const classes = cn(
    'text-xs uppercase font-bold rounded leading-normal border text-white',
    { 'px-12 py-3': padding, [typeClasses[type]]: !disabled, 'bg-grey': disabled },
    className
  );
  return (
    <button disabled={disabled} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
