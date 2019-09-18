import React, { ReactNode } from 'react';

interface Props {
  w: number;
  h: number;
  children: ReactNode;
}

const PanelMainText = ({ children, w, h }: Props) => {
  const smallest = Math.min(w, h);

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

  console.log(smallest, className);

  return <p className={className}>{children}</p>;
};

export default PanelMainText;
