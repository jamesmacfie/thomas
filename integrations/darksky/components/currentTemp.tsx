import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Panel from 'components/panel';
import IntegrationsWrapper from './integrationsWrapper';
import { StoreContext } from '../store';
import { TempUnits } from './units';

const CurrentTemp = observer(({ integrationId, componentConfig, integrationConfig }: IntegrationComponentProps) => {
  const store = useContext(StoreContext);
  const forecast = store.forecasts[integrationId];

  if (!forecast) {
    return <Panel />;
  }

  return (
    <Panel {...componentConfig} className="flex justify-center items-center">
      <p className="text-2xl">
        {forecast.currently.temperature}
        <TempUnits unit={integrationConfig.unit} />
      </p>
    </Panel>
  );
});

export default (props: any) => (
  <IntegrationsWrapper>
    <CurrentTemp {...props} />
  </IntegrationsWrapper>
);
