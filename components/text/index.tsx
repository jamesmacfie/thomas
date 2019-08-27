import React, { HTMLProps } from 'react';
import cn from 'classnames';

export const H1 = ({ className, ...props }: HTMLProps<HTMLHeadingElement>) => (
  <h1 {...props} className={cn('text-5xl font-thin my-6', className)} />
);

export const H2 = ({ className, ...props }: HTMLProps<HTMLHeadingElement>) => (
  <h2 {...props} className={cn('text-xl font-thin my-6', className)} />
);

export const H3 = ({ className, ...props }: HTMLProps<HTMLHeadingElement>) => (
  <h3 {...props} className={cn('uppercase text-xs text-grey font-normal mb-3', className)} />
);

export const H4 = ({ className, ...props }: HTMLProps<HTMLHeadingElement>) => (
  <h4 {...props} className={cn('uppercase text-s text-grey font-normal mb-3', className)} />
);
