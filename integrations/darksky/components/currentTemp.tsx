import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Panel from 'components/panel';
import PanelMainText from 'components/panelMainText';
import IntegrationsWrapper from './integrationsWrapper';
import { StoreContext } from '../store';
import { TempUnits } from './_units';

const CurrentTemp = observer(({ integrationId, componentConfig, integrationConfig }: IntegrationComponentProps) => {
  const store = useContext(StoreContext);
  const forecast = store.forecasts[integrationId];

  if (!forecast) {
    return <Panel {...componentConfig} label="Current temperature" />;
  }

  return (
    <Panel {...componentConfig} label="Current temperature">
      <PanelMainText {...componentConfig}>
        {forecast.currently.temperature}
        <TempUnits unit={integrationConfig.unit} />
      </PanelMainText>
    </Panel>
  );
});

export default (props: any) => (
  <IntegrationsWrapper>
    <CurrentTemp {...props} />
  </IntegrationsWrapper>
);
