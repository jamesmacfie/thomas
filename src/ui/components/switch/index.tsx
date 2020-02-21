import React from 'react';
import cn from 'classnames';
import './styles.css';

interface Props {
  active?: boolean;
  onChange: (newState: boolean) => void;
}

const Switch = ({ active, onChange }: Props) => {
  const classes = cn('w-6 h-12 rounded-full p-1 bg-text-primary flex justify-center cursor-pointer', {
    'bg-text-primary items-end': active,
    'bg-text-secondary items-start': !active
  });

  const toggle = () => onChange(!active);

  return (
    <div className={classes} onClick={toggle}>
      <div className="w-4 h-4 rounded-full bg-panel-dark top-0 z-10" />
    </div>
  );
};

export default Switch;
