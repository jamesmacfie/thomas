import React, { ReactNode } from 'react';
import cn from 'classnames';
import { useDebouncedCallback } from 'use-debounce';
import './styles.css';

interface Props {
  className?: string;
  children: ReactNode;
}

const Scroll = ({ children, className }: Props) => {
  const [debouncedOnScroll] = useDebouncedCallback((target: any) => {
    console.log(target);
    target.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, 10000);
  return (
    <div className={cn('relative', className)}>
      <div className="absolute left-0 right-0 top-0 h-4 scroll-top" />
      <div onScroll={e => debouncedOnScroll(e.target)} className="h-full overflow-y-scroll">
        {children}
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-4 scroll-bottom" />
    </div>
  );
};

export default Scroll;
