import React, { ReactNode, CSSProperties } from 'react';
import cn from 'classnames';
import Panel from '../panel';
import AddCircle from '../../svg/add-circle.svg';

interface Props {
  className?: string;
  size: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: ReactNode;
  style?: CSSProperties;
  padding?: boolean;
}

const classes: { [key: string]: string } = {
  sm: 'w-128 h-96',
  md: 'w-192 h-128',
  lg: 'w-256 h-192'
};

const Overlay = ({ onClick }: { onClick?: () => void }) => {
  return <div onClick={onClick} className="cursor-pointer absolute pin-modal bg-overlay-dark z-10" />;
};

const Modal = ({ children, className, size, onClick, style, padding = true }: Props) => {
  const panelClasses = cn(
    classes[size],
    'z-10 absolute pin-center',
    {
      'p-6': padding
    },
    className
  );
  return (
    <>
      <Overlay onClick={onClick} />
      <Panel style={style} fit={false} className={panelClasses} padding={padding}>
        <div className="z-20 absolute pin-close h-12 w-12 text-white current-stroke rotate-45deg" onClick={onClick}>
          <AddCircle />
        </div>
        {children}
      </Panel>
    </>
  );
};

export default Modal;
