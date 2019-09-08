import React from 'react';
interface Props {
  unit: DarkSkyUnits;
  className?: string;
}

export const TempUnits = ({ className, unit }: Props) => {
  return <span className={className}>°{unit === 'us' ? 'F' : 'C'}</span>;
};

export default TempUnits;
