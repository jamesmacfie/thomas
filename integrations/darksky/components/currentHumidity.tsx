import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Panel from 'components/panel';
import PanelMainText from 'components/panelMainText';
import IntegrationsWrapper from './integrationsWrapper';
import { StoreContext } from '../store';

const CurrentHumidity = observer(({ integrationId, componentConfig }: IntegrationComponentProps) => {
  const store = useContext(StoreContext);
  const forecast = store.forecasts[integrationId];

  if (!forecast) {
    return <Panel {...componentConfig} label="Current humidity" />;
  }

  return (
    <Panel {...componentConfig} className="flex flex-col" label="Current humidity">
      <PanelMainText {...componentConfig}>{forecast.currently.humidity}%</PanelMainText>
    </Panel>
  );
});

export default (props: any) => (
  <IntegrationsWrapper>
    <CurrentHumidity {...props} />
  </IntegrationsWrapper>
);
