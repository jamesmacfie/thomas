import React from 'react';
interface Props {
  units?: DarkSkyUnits;
  className?: string;
}

const WindUnits = ({ className, units }: Props) => {
  return <span className={className}>{units === 'us' ? 'm/h' : 'km/h'}</span>;
};

export default WindUnits;
