import React, { HTMLProps } from 'react';
import cn from 'classnames';

export const H2 = ({ className, ...props }: HTMLProps<HTMLHeadingElement>) => (
  <h2 {...props} className={cn('text-xl font-thin my-6', className)} />
);

export const H3 = ({ className, ...props }: HTMLProps<HTMLHeadingElement>) => (
  <h3 {...props} className={cn('uppercase text-sm font-normal mb-3', className)} />
);
