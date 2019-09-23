import React, { ReactNode } from 'react';
import cn from 'classnames';
import './styles.css';

interface Props {
  className?: string;
  children: ReactNode;
}

const Scroll = ({ children, className }: Props) => {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute left-0 right-0 top-0 h-4 z-10 scroll-top" />
      <div className="h-full overflow-y-scroll">{children}</div>
      <div className="absolute left-0 right-0 bottom-0 z-10 h-4 scroll-bottom" />
    </div>
  );
};

export default Scroll;
