import React, { ReactNode } from 'react';

interface Props {
  w: number;
  h: number;
  children: ReactNode;
  increase?: number;
}

const PanelMainText = ({ children, w, h, increase = 0 }: Props) => {
  const smallest = Math.min(w, h) + increase;

  let className;
  if (smallest <= 2) {
    className = 'text-xl';
  } else if (smallest <= 4) {
    className = 'text-3xl';
  } else if (smallest <= 6) {
    className = 'text-5xl';
  } else if (smallest <= 8) {
    className = 'text-7xl';
  } else {
    className = 'text-8xl';
  }

  return <p className={className}>{children}</p>;
};

export default PanelMainText;
