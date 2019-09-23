import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
// import numeral from 'numeral';
import Panel from 'components/panel';
// import { toJS } from 'mobx';
// import { H4 } from 'components/text';
// import ForcastImage from './_image';
import getForecastGradient from './_gradient';
import { StoreContext } from '../../store';
// import NextWeek from './week';
import TempUnits from '../_units';
import './styles.css';

const FiveDayForecast = observer(({ integrationId, widgetConfig }: IntegrationWidgetProps) => {
  const store = useContext(StoreContext);
  const forecast = store.forecasts[integrationId];

  if (!forecast) {
    return <Panel {...widgetConfig} label="Five day forecast" />;
  }

  const currentTemp = forecast.currently.temperature;
  // const highTemp = store.data['sensor.darksky_daytime_high_temperature'];
  // const highTempState = entityToValue(highTemp);
  // const lowTemp = store.data['sensor.dark_sky_overnight_low_temperature'];
  // const lowTempState = entityToValue(lowTemp);
  const currentIcon = forecast.currently.icon;
  // const currentIconState = entityToValue(currentIcon);
  // const currentSummary = store.data['sensor.darksky_summary'];
  // const currentSummaryState = entityToValue(currentSummary, '');
  // const feelsLikeTemp = store.data['sensor.dark_sky_apparent_temperature'];
  // const feelsLikeTempState = entityToValue(feelsLikeTemp);
  // const windSpeed = store.data['sensor.dark_sky_wind_speed'];
  // const windSpeedState = entityToValue(windSpeed);
  // const windDirection = store.data['sensor.dark_sky_wind_bearing_template'];
  // const windDirectionState = entityToValue(windDirection);
  // // const imageLocation = getForecastImage(currentIconState);
  const gradient = getForecastGradient(currentIcon);

  return (
    <Panel {...widgetConfig} padding={false} className="relative">
      <div className="flex items-center mb-4">
        <p className="flex-grow text-6xl whitespace-no-wrap text-shadow relative">
          {currentTemp}
          <span className="text-base align-top">
            <TempUnits />
          </span>
        </p>
      </div>
      <div
        className={`absolute z-0 pin-t pin-l pin-r rounded-t bg-cover forecast-image border-b-2 border-grey-darkest`}
        style={{ backgroundImage: `${gradient}` }}
      />
      {/*
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
      <NextWeek unitOfMeasurement={unitOfMeasurement} /> */}
    </Panel>
  );
});

export default FiveDayForecast;
