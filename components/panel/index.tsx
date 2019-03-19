import React, { ReactNode } from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
  children: ReactNode;
}

const Panel = ({ className, children }: Props) => {
  return <div className={cn(className, 'bg-panel')}>{children}</div>;
};

export default Panel;
