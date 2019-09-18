import React, { ReactNode, useState } from 'react';
import cn from 'classnames';
import Panel from 'components/panel';
import Icon from 'components/icon';
import { H4 } from 'components/text';
import './styles.css';

interface Props {
  className?: string;
  title?: string;
  size: 'sm' | 'md' | 'lg';
  onClose: () => void;
  children: ReactNode;
  padding?: boolean;
}

const classes: { [key: string]: string } = {
  sm: 'w-128 h-96',
  md: 'w-192 h-128',
  lg: 'w-256 h-192'
};

const Modal = ({ title, children, className, size, onClose, padding = true }: Props) => {
  const [willClose, setWillClose] = useState<boolean>(false);
  const panelClasses = cn(
    classes[size],
    'z-10 absolute pin-center cursor-default',
    {
      'p-6': padding,
      'modal-open': !willClose,
      'modal-close': willClose
    },
    className
  );
  const close = () => {
    setWillClose(true);
    setTimeout(() => {
      onClose();
    }, 250);
  };
  const onOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target) {
      return;
    }
    event.stopPropagation();
    close();
  };

  return (
    <>
      <div
        onClick={onOverlayClick}
        className="cursor-pointer fixed left-0 top-0 h-screen w-screen bg-overlay-dark z-10"
      >
        <Panel fit={false} className={panelClasses} padding={padding}>
          <div>
            <H4 className="text-2">{title}</H4>
            <Icon
              onClick={close}
              icon="plus-circle"
              className="cursor-pointer z-20 absolute pin-close text-2xl margin text-white current-stroke rotate-45deg"
            />
          </div>

          {children}
        </Panel>
      </div>
    </>
  );
};

export default Modal;
