import React from 'react';
interface Props {
  units?: DarkSkyUnits;
  className?: string;
}

const TempUnits = ({ className, units }: Props) => {
  return <span className={className}>°{units === 'us' ? 'F' : 'C'}</span>;
};

export default TempUnits;
