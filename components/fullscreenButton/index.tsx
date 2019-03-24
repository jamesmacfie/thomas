import React, { MouseEvent } from 'react';
import './styles.css';

interface Props {
  isOpen: Boolean;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

const FullscreenButton = ({ isOpen, onClick }: Props) => {
  const classes = isOpen ? 'fullscreen-button-open' : 'fullscreen-button-closed';
  return (
    <button className={`bg-overlay-dark absolute ${classes} w-5 h-5 rounded-tl-lg rounded-rl-sm`} onClick={onClick} />
  );
};

export default FullscreenButton;
