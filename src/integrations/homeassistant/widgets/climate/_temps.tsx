import React from 'react';
import cn from 'classnames';

interface Props {
  min: string;
  target: string;
  max: string;
}

const ClimateTemp = ({ target, min, max }: Props) => {
  const parsedMin = parseFloat(min);
  const parsedMax = parseFloat(max);
  const parsedTarget = parseFloat(target);
  const tempValues = [];
  for (let i = 0; i < parsedMax - parsedMin; i++) {
    tempValues.push(i + parsedMin);
  }
  return (
    <ul className="list-reset text-center">
      {tempValues.map(temp => {
        const classes = cn(' leading-none py-2 cursor-pointer', {
          'text-primary text-7xl': temp === parsedTarget,
          'text-secondary text-6xl': temp !== parsedTarget
        });
        return (
          <li className={classes}>
            {temp}
            <span className="text-3xl">°C</span>
          </li>
        );
      })}
    </ul>
  );
};
export default ClimateTemp;
