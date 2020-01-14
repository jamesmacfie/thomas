import React, { ReactNode, useState } from 'react';
import cn from 'classnames';
import Panel from 'components/panel';
import Icon from 'components/icon';
import { H4 } from 'components/text';
import ClientOnlyPortal from './clientOnlyPortal';
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
    'z-50 absolute pin-center cursor-default',
    {
      'p-6': padding,
      'modal-open': !willClose,
      'modal-close': willClose
    },
    className
  );
  const overlayClasses = cn(
    'cursor-pointer fixed left-0 top-0 h-screen w-screen bg-overlay-dark z-40',
    {
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
    <ClientOnlyPortal selector="#modal">
      <div onClick={onOverlayClick} className={overlayClasses}>
        <Panel fit={false} className={panelClasses} padding={padding}>
          <div>
            <H4 className="text-2">{title}</H4>
            <Icon
              onClick={close}
              icon="plus-circle"
              className="cursor-pointer z-50 absolute pin-close text-2xl margin text-primary current-stroke rotate-45deg"
            />
          </div>

          {children}
        </Panel>
      </div>
    </ClientOnlyPortal>
  );
};

export default Modal;
