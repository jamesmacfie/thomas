import React, { HTMLProps } from 'react';
import cn from 'classnames';

const Input = (props: HTMLProps<HTMLInputElement>) => {
  const classes = cn(
    'rounded-sm bg-grey-darkest border-grey focus:border-grey-light border-b border-transparent p-2',
    props.className
  );
  return <input {...props} className={classes} />;
};

export default Input;
