import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  className?: string;
  padding?: Boolean;
  color: 'primary' | 'secondary' | 'secondary-alt' | 'danger';
  href?: string;
}

const colorClasses = {
  primary: 'bg-blue border-blue-dark hover:bg-blue-dark hover:border-blue text-white',
  secondary: 'bg-transparent border-white hover:text-blue hover:border-blue text-white',
  'secondary-alt': 'bg-transparent border-grey-darker text-grey-darker hover:text-blue hover:border-blue',
  danger: 'bg-red text-white border-red-light'
};

const Button = ({ children, color, className, padding = true, disabled = false, onClick, href, ...props }: Props) => {
  const classes = cn(
    'text-xs uppercase font-bold rounded leading-normal border',
    { 'px-12 py-3': padding && !href, [colorClasses[color]]: !disabled, 'bg-grey': disabled },
    className
  );
  const cmp = href ? (
    <Link to={href} className={cn({ 'block px-12 py-3': padding })}>
      {children}
    </Link>
  ) : (
    children
  );
  return (
    <button disabled={disabled} className={classes} onClick={onClick} {...props}>
      {cmp}
    </button>
  );
};

export default Button;
