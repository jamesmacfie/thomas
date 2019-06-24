import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import numeral from 'numeral';
import Panel from '../panel';
import { H4 } from '../text';
import Store from '../../store';
import ForcastImage from './image';
import getForecastGradient from './gradient';
import { StoreContext } from '../../store';
import { entityToValue } from '../../utils/entity';
import NextWeek from './week';
import './styles.css';

export interface Props {
  unitOfMeasurement: string;
  title?: string;
  width?: number;
}

// const dimensions: { [key: number]: string } = {
//   1: '7.5rem',
//   2: '15rem',
//   3: '22.5rem',
//   4: '30rem',
//   5: '37.5rem',
//   6: '45rem'
// };

const LayoutForecast = observer(({ title, unitOfMeasurement }: Props) => {
  const store = useContext(StoreContext) as Store;
  const style = {
    height: '45em', // Hack. Would be better if this is dynamic
    width: '16rem' // Hack. Would be better if this is dynamic
  };
  if (store.status !== 'AUTHENTICATED') {
    return <Panel fit={false} className="relative" style={style} />;
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
  // const imageLocation = getForecastImage(currentIconState);
  const gradient = getForecastGradient(currentIconState);
  console.log(gradient);

  return (
    <Panel fit={false} padding={false} className="relative" style={style}>
      {title && <H4 className="text-white uppercase mb-6 text-grey-dark relative z-10 text-shadow m-4">{title}</H4>}
      <div
        className={`absolute z-0 pin-t pin-l pin-r rounded-t bg-cover forecast-image border-b-2 border-grey-darkest`}
        style={{ backgroundImage: `${gradient}` }}
      />
      <div className="relative z-10 px-4 forecast-image-inner">
        <div className="flex items-center mb-4">
          <p className="flex-grow text-6xl whitespace-no-wrap text-shadow relative">
            {currentTempState}
            <span className="text-base align-top">{unitOfMeasurement}</span>
          </p>
        </div>
        <ForcastImage icon={currentIconState} className="absolute h-16 w-16 forecast-icon" />
        <p className="flex mt-2 text-xs whitespace-no-wrap text-shadow">
          <span className="block flex-grow self-end">
            {currentSummaryState}. Feels like {feelsLikeTempState}
          </span>
          <span className="text-sm">
            {highTempState} {unitOfMeasurement}
          </span>
        </p>
        <p className="flex mt-2 text-xs whitespace-no-wrap text-shadow">
          <span className="block flex-grow self-end">
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
          </span>
          <span className="text-sm">
            {lowTempState} {unitOfMeasurement}
          </span>
        </p>
      </div>
      <NextWeek unitOfMeasurement={unitOfMeasurement} />
    </Panel>
  );
});

export default LayoutForecast;
