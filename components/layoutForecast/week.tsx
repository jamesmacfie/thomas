import React, { useContext } from 'react';
import cn from 'classnames';
import moment from 'moment';
import numeral from 'numeral';
import { observer } from 'mobx-react-lite';
import Store from '../../store';
import { StoreContext } from '../../store';
import AddCircle from '../../svg/add-circle.svg';
import { entityToValue } from '../../utils/entity';
import { bearingToCompassDirection } from '../../utils/bearing';

interface Props {
  unitOfMeasurement: string;
}

const LayoutForecast = observer(({ unitOfMeasurement }: Props) => {
  const store = useContext(StoreContext) as Store;
  if (store.status !== 'AUTHENTICATED') {
    return null;
  }

  const values = [];
  for (let i = 1; i <= 6; i++) {
    const high = store.data[`sensor.darksky_daytime_high_temperature_${i}`];
    const low = store.data[`sensor.darksky_overnight_low_apparent_temperature_${i}`];
    const summary = store.data[`sensor.darksky_summary_${i}`];
    const windSpeed = store.data[`sensor.dark_sky_wind_speed_${i}`];
    const windBearing = store.data[`sensor.darksky_wind_bearing_${i}`];
    // const icon = store.data[`sensor.darksky_icon_${i}`];

    values.push({
      high: entityToValue(high),
      low: entityToValue(low),
      summary: entityToValue(summary, 'n/a'),
      day:
        i === 1
          ? 'Tomorrow'
          : moment()
              .add(i, 'd')
              .format('dddd'),
      windKmph: parseInt(
        numeral(windSpeed ? windSpeed.state : 0)
          .multiply(3.6)
          .value()
          .toString(),
        10
      ),
      windDirection: bearingToCompassDirection(windBearing ? parseFloat(windBearing.state.toString()) : 0)
      // icon: icon.state
    });
  }

  return (
    <div>
      {values.map((v, idx) => {
        const classes = cn('flex px-2 py-3', {
          ' border-b border-grey-dark': idx < values.length - 1
        });
        return (
          <div className={classes} key={idx}>
            <div className="flex-grow">
              <div className="flex block">
                <p className="flex-grow text-sm font-semibold">{v.day}</p>
                <p className="pl-3 text-sm">
                  <span className="text-red-light">
                    {parseInt(v.high, 10)} {unitOfMeasurement}
                  </span>{' '}
                  -{' '}
                  <span className="text-blue-light">
                    {parseInt(v.low, 10)}
                    {unitOfMeasurement}
                  </span>
                </p>
              </div>
              <p className="pt-2 text-sm">
                {v.summary} Winds {v.windDirection} at {v.windKmph}km/h
              </p>
            </div>
            <div className="ml-2 w-12 flex-no-shrink flex justify-center items-center">
              <AddCircle className="h-6 w-6 text-white current-stroke" />
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default LayoutForecast;
