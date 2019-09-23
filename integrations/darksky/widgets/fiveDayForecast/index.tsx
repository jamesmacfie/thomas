import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import numeral from 'numeral';
import getForecastGradient from './_gradient';
import { StoreContext } from '../../store';
import IntegrationsWrapper from '../integrationsWrapper';
import NextWeek from './_week';
import Panel from 'components/panel';
import ForcastImage from './_image';
import TempUnits from '../_units';
import { bearingToCompassDirection } from 'utils/bearing';
import './styles.css';

const FiveDayForecast = observer(({ integrationId, widgetConfig }: IntegrationWidgetProps) => {
  const store = useContext(StoreContext);
  const forecast = store.forecasts[integrationId];

  if (!forecast) {
    return <Panel {...widgetConfig} label="Five day forecast" />;
  }

  const currentTemp = forecast.currently.temperature.toFixed(1);
  const highTemp = forecast.daily.data[0].temperatureHigh.toFixed(1);
  const lowTemp = forecast.daily.data[0].temperatureLow.toFixed(1);
  const currentIcon = forecast.currently.icon;
  const currentSummary = forecast.currently.summary;
  const feelsLikeTemp = forecast.currently.apparentTemperature.toFixed(1);
  const windSpeed = forecast.currently.windSpeed;
  const windDirection = bearingToCompassDirection(forecast.currently.windBearing);
  const gradient = getForecastGradient(currentIcon);

  return (
    <Panel {...widgetConfig} padding={false} className="flex flex-col relative" overflow={false}>
      <div className="p-4 forecast-image-inner rounded-tl rounded-tr" style={{ backgroundImage: `${gradient}` }}>
        <div className="flex items-center mb-4">
          <p className="flex-grow text-6xl whitespace-no-wrap text-shadow relative">
            {currentTemp}
            <span className="text-base align-top">
              <TempUnits />
            </span>
          </p>
        </div>
        <ForcastImage icon={currentIcon} className="absolute h-16 w-16 forecast-icon" />
        <div className="flex">
          <div className="flex-grow pr-4">
            <p className="text-xs text-shadow">
              {currentSummary}. Feels like {feelsLikeTemp}
              <TempUnits />. Wind{' '}
              {parseInt(
                numeral(windSpeed)
                  .multiply(1.60934)
                  .value()
                  .toString(),
                10
              )}{' '}
              km/h {windDirection}
            </p>
          </div>
          <div>
            <p className="w-16 flex flex-col text-xs text-shadow text-right">
              <span className="text-sm">
                {highTemp} <TempUnits />
              </span>
              <span className="text-sm">
                {lowTemp} <TempUnits />
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll">
        <NextWeek forecast={forecast} />
      </div>
    </Panel>
  );
});

export default (props: any) => (
  <IntegrationsWrapper>
    <FiveDayForecast {...props} />
  </IntegrationsWrapper>
);
