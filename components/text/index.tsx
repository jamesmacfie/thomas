import React, { HTMLProps } from 'react';
import cn from 'classnames';

interface Props extends HTMLProps<HTMLHeadingElement> {
  margin?: boolean;
}

// TODO - I can do better than this
const textCn = (marginClass: string, baseClasses: string, propClasses?: string, margin?: boolean) => {
  return cn(baseClasses, propClasses, {
    [marginClass]: !!margin
  });
};

export const H1 = ({ className, margin = true, ...props }: Props) => (
  <h1 {...props} className={textCn('my-6', 'text-5xl font-thin ', className, margin)} />
);

export const H2 = ({ className, margin = true, ...props }: Props) => (
  <h2 {...props} className={textCn('my-6', 'text-xl font-thin ', className, margin)} />
);

export const H3 = ({ className, margin = true, ...props }: Props) => (
  <h3 {...props} className={textCn('mb-3', 'uppercase text-xs text-grey font-normal ', className, margin)} />
);

export const H4 = ({ className, margin = true, ...props }: Props) => (
  <h4 {...props} className={textCn('mb-3', 'uppercase text-s text-grey font-normal', className, margin)} />
);
