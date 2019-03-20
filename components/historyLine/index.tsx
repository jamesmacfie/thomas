import React from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
}

const HistoryLine = ({ className }: Props) => {
  const classes = cn(className, '');
  return <div className={classes}> </div>;
};
export default HistoryLine;
