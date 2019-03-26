import React from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
  percentComplete: number;
}

const ProgressLine = ({ percentComplete, className }: Props) => {
  return (
    <div className={cn('w-100 bg-overlay-dark relative', className)}>
      <div className="absolute pin-t pin-b pin-l progress" style={{ width: `${percentComplete}%` }} />
    </div>
  );
};

export default ProgressLine;
