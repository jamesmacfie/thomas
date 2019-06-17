import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import numeral from 'numeral';
import Panel from '../panel';
import { H3 } from '../text';
import Store from '../../store';
import getForecastImage from './image';
import { StoreContext } from '../../store';
import { entityToValue } from '../../utils/entity';
import NextWeek from './week';
import './styles.css';

export interface Props {
  unitOfMeasurement: string;
  title?: string;
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

const LayoutForecast = observer(({ width = 1, title, unitOfMeasurement }: Props) => {
  const store = useContext(StoreContext) as Store;
  const styles = {
    height: '41rem', // Hack. Would be better if this is dynamic
    width: dimensions[width]
  };
  if (store.status !== 'AUTHENTICATED') {
    return <Panel fit={false} className="relative" style={styles} />;
  }

  const currentTemp = store.data['sensor.darksky_temperature'];
  const currentTempState = entityToValue(currentTemp);
  const highTemp = store.data['sensor.darksky_daytime_high_temperature'];
  const highTempState = entityToValue(highTemp);
  const lowTemp = store.data['sensor.dark_sky_overnight_low_temperature'];
  const lowTempState = entityToValue(lowTemp);
  const currentIcon = store.data['sensor.darksky_icon'];
  const currentIconState = entityToValue(currentIcon);
  const currentSummary = store.data['sensor.darksky_summary'];
  const currentSummaryState = entityToValue(currentSummary, '');
  const feelsLikeTemp = store.data['sensor.dark_sky_apparent_temperature'];
  const feelsLikeTempState = entityToValue(feelsLikeTemp);
  const windSpeed = store.data['sensor.dark_sky_wind_speed'];
  const windSpeedState = entityToValue(windSpeed);
  const windDirection = store.data['sensor.dark_sky_wind_bearing_template'];
  const windDirectionState = entityToValue(windDirection);
  const imageLocation = getForecastImage(currentIconState);

  return (
    <Panel fit={false} padding={false} className="relative" style={styles}>
      {title && <H3 className="mb-6 text-grey-dark relative z-10 text-shadow m-4">{title}</H3>}
      <div
        className="absolute z-0 pin-t pin-l pin-r rounded-t bg-cover forecast-image"
        style={{ backgroundImage: `url(${imageLocation})` }}
      />
      <div className="relative z-10 p-4 forecast-image-inner">
        <div className="flex items-center mb-4">
          <p className="flex-grow text-6xl whitespace-no-wrap text-shadow relative">
            {currentTempState}
            <span className="text-base align-top">{unitOfMeasurement}</span>
            <span className="absolute text-sm pin-r pin-t text-shadow pt-2">
              {highTempState} {unitOfMeasurement}
            </span>
            <span className="absolute text-sm pin-r pin-b text-shadow pb-2">
              {lowTempState} {unitOfMeasurement}
            </span>
          </p>
        </div>
        <p className="mt-2 text-xs whitespace-no-wrap text-shadow">
          {currentSummaryState.length && <span>{currentSummaryState}. </span>}
          Feels like {feelsLikeTempState}
          <span className="text-xs align-top">{unitOfMeasurement}</span>
        </p>
        <p className="mt-2 text-xs whitespace-no-wrap text-shadow">
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
      <NextWeek unitOfMeasurement={unitOfMeasurement} />
    </Panel>
  );
});

export default LayoutForecast;
