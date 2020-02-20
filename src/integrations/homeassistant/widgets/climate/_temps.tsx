import React from 'react';
import cn from 'classnames';

interface Props {
  current: number;
}

const tempValues = [15, 16, 17, 18, 19, 20, 21, 22, 23, 25];

const ClimateTemp = ({ current }: Props) => {
  return (
    <ul className="list-reset text-center">
      {tempValues.map(temp => {
        const classes = cn(' leading-none py-2 cursor-pointer', {
          'text-primary text-7xl': temp === current,
          'text-secondary text-6xl': temp !== current
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
