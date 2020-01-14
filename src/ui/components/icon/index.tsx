import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  icon: IconProp;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
}

const FAIcon = ({ icon, className, containerClassName, onClick }: Props) => (
  <span className={containerClassName} onClick={onClick}>
    <FontAwesomeIcon icon={icon} className={className} />
  </span>
);

export default FAIcon;
