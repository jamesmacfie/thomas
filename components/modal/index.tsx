import React, { ReactNode, CSSProperties } from 'react';
import cn from 'classnames';
import Panel from 'components/panel';
import Icon from 'components/icon';
import { H4 } from 'components/text';

interface Props {
  className?: string;
  title?: string;
  size: 'sm' | 'md' | 'lg';
  onClose: () => void;
  children: ReactNode;
  style?: CSSProperties;
  padding?: boolean;
}

const classes: { [key: string]: string } = {
  sm: 'w-128 h-96',
  md: 'w-192 h-128',
  lg: 'w-256 h-192'
};

const Modal = ({ title, children, className, size, onClose, style, padding = true }: Props) => {
  const panelClasses = cn(
    classes[size],
    'z-10 absolute pin-center cursor-default',
    {
      'p-6': padding
    },
    className
  );
  const onOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target) {
      return;
    }
    event.stopPropagation();
    onClose();
  };

  return (
    <>
      <div
        onClick={onOverlayClick}
        className="cursor-pointer fixed left-0 top-0 h-screen w-screen bg-overlay-dark z-10"
      >
        <Panel style={style} fit={false} className={panelClasses} padding={padding}>
          <div>
            <H4 className="text-2">{title}</H4>
            <Icon
              onClick={onClose}
              icon="addCircle"
              className="cursor-pointer z-20 absolute pin-close w-8 h-8 margin text-white current-stroke rotate-45deg"
            />
          </div>

          {children}
        </Panel>
      </div>
    </>
  );
};

export default Modal;
