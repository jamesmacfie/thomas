import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import numeral from 'numeral';
import Panel from '../panel';
import { H3 } from '../text';
import Store from '../../store';
import ForcastIcon from './icon';
import { StoreContext } from '../../store';

export interface Props {
  unitOfMeasurement: string;
  title?: string;
  height?: number;
  width?: number;
}

const dimensions: { [key: number]: string } = {
  1: '9rem',
  2: '18rem',
  3: '27rem',
  4: '36rem',
  5: '45rem',
  6: '54rem'
};

const entityToValue = (entity: Entity) => {
  let state;
  if (typeof entity === 'undefined') {
    state = '--';
  } else {
    state = entity.state !== 'unknown' ? entity.state : '--';
  }
  return state;
};

const LayoutForecast = observer(({ width = 1, height = 1, title, unitOfMeasurement }: Props) => {
  const store = useContext(StoreContext) as Store;
  const styles = {
    height: dimensions[height],
    width: dimensions[width]
  };
  if (store.status !== 'AUTHENTICATED') {
    return <Panel fit={false} className="relative" style={styles} />;
  }

  const currentTemp = store.data['sensor.darksky_temperature'];
  const currentTempState = entityToValue(currentTemp);
  const currentIcon = store.data['sensor.darksky_icon'];
  const currentIconState = entityToValue(currentIcon);
  const feelsLikeTemp = store.data['sensor.dark_sky_apparent_temperature'];
  const feelsLikeTempState = entityToValue(feelsLikeTemp);
  const windSpeed = store.data['sensor.dark_sky_wind_speed'];
  const windSpeedState = entityToValue(windSpeed);
  const windDirection = store.data['sensor.dark_sky_wind_bearing_template'];
  const windDirectionState = entityToValue(windDirection);

  return (
    <Panel fit={false} className="relative" style={styles}>
      {title && <H3 className="mb-6 text-grey-dark">{title}</H3>}
      <div>
        <div className="flex items-center mb-4">
          <p className="flex-grow text-4xl whitespace-no-wrap">
            {currentTempState}
            <span className="text-base align-top">{unitOfMeasurement}</span>
          </p>
          <div className="flex flex-grow justify-center">
            <ForcastIcon icon={currentIconState.toString()} />
          </div>
        </div>
        <p className="mt-2 text-xs whitespace-no-wrap">
          Feels like {feelsLikeTempState}
          <span className="text-xs align-top">{unitOfMeasurement}</span>
        </p>
        <p className="mt-2 text-xs whitespace-no-wrap">
          Wind{' '}
          {windSpeedState !== '--' &&
            parseInt(
              numeral(windSpeedState)
                .multiply(1.60934)
                .value()
                .toString(),
              10
            )}{' '}
          km/h {windDirectionState}
        </p>
      </div>
    </Panel>
  );
});

export default LayoutForecast;
