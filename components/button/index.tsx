import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  className?: string;
  padding?: Boolean;
  color: 'primary' | 'secondary' | 'secondary-alt' | 'danger';
}

const colorClasses = {
  primary: 'bg-blue border-blue-dark hover:bg-blue-dark hover:border-blue text-white',
  secondary: 'bg-transparent border-white hover:text-blue hover:border-blue text-white',
  'secondary-alt': 'bg-transparent border-grey-darker text-grey-darker hover:text-blue hover:border-blue',
  danger: 'bg-red text-white'
};

const Button = ({ children, color, className, padding = true, disabled = false, onClick, ...props }: Props) => {
  const classes = cn(
    'text-xs uppercase font-bold rounded leading-normal border',
    { 'px-12 py-3': padding, [colorClasses[color]]: !disabled, 'bg-grey': disabled },
    className
  );
  return (
    <button disabled={disabled} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
