import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Panel from 'components/panel';
import PanelMainText from 'components/panelMainText';
import IntegrationsWrapper from './integrationsWrapper';
import { StoreContext } from '../store';

const CurrentHumidity = observer(({ integrationId, widgetConfig }: IntegrationWidgetProps) => {
  const store = useContext(StoreContext);
  const forecast = store.forecasts[integrationId];

  if (!forecast) {
    return <Panel {...widgetConfig} label="Current humidity" />;
  }

  const humidity = forecast.currently.humidity * 100;

  return (
    <Panel {...widgetConfig} className="flex flex-col" label="Current humidity">
      <PanelMainText {...widgetConfig}>{humidity.toFixed(0)}%</PanelMainText>
    </Panel>
  );
});

export default (props: any) => (
  <IntegrationsWrapper>
    <CurrentHumidity {...props} />
  </IntegrationsWrapper>
);
