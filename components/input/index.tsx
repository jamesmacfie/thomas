import React, { HTMLProps } from 'react';
import cn from 'classnames';

const Input = (props: HTMLProps<HTMLInputElement>) => {
  const classes = cn(
    'bg-transparent border-grey focus:border-grey-light py-2 border-0 border-b font-light',
    props.className
  );
  return <input {...props} className={classes} />;
};

export default Input;
