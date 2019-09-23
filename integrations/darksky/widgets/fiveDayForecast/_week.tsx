import React from 'react';
import cn from 'classnames';
import moment from 'moment';
import ForecastImage from './_image';
import TempUnits from '../_units';
import { bearingToCompassDirection } from 'utils/bearing';

interface DayProps {
  daysSinceToday: number;
  forecast: DarkSkyForecastDaily;
}

interface Props {
  forecast: DarkSkyForecast;
}

const Day = ({ forecast, daysSinceToday }: DayProps) => {
  const classes = cn('flex px-4 py-3', {
    'border-t border-grey-dark': daysSinceToday > 1
  });
  const dayName =
    daysSinceToday === 1
      ? 'Tomorrow'
      : moment()
          .add(daysSinceToday, 'd')
          .format('dddd');
  return (
    <div className={classes}>
      <div className="flex-grow">
        <div className="flex block">
          <p className="flex-grow text-xs font-semibold">{dayName}</p>
        </div>
        <p className="pt-2 text-xs">
          {forecast.summary} There is a {forecast.precipProbability}% chance of rain{'. '}
          {forecast.windSpeed
            ? `Winds ${bearingToCompassDirection(forecast.windBearing)} at ${forecast.windSpeed}km/h`
            : ''}
        </p>
      </div>
      <div className="ml-2 w-16 flex-shrink-0 flex justify-center text-right flex-col">
        <ForecastImage icon={forecast.icon} className="h-6 w-6 text-white self-end current-stroke" />
        <p className="text-sm mb-1">
          <span className="text-red-light">
            {forecast.temperatureHigh.toFixed(1)} <TempUnits />
          </span>
        </p>
        <p className="text-xs">
          <span className="text-blue-light">
            {forecast.temperatureLow.toFixed(1)}
            <TempUnits />
          </span>
        </p>
      </div>
    </div>
  );
};

const Week = ({ forecast }: Props) => {
  const nextWeek = forecast.daily.data.slice(1);
  return (
    <>
      {nextWeek.map((forecast, i) => (
        <Day key={i} forecast={forecast} daysSinceToday={i + 1} />
      ))}
    </>
  );
};

export default Week;
