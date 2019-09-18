import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Panel from 'components/panel';
import { H3 } from 'components/text';
import PanelMainText from 'components/panelMainText';
import IntegrationsWrapper from './integrationsWrapper';
import { StoreContext } from '../store';
import { TempUnits } from './_units';

const CurrentTemp = observer(({ integrationId, componentConfig, integrationConfig }: IntegrationComponentProps) => {
  const store = useContext(StoreContext);
  const forecast = store.forecasts[integrationId];

  if (!forecast) {
    return (
      <Panel {...componentConfig}>
        <></>
      </Panel>
    );
  }

  return (
    <Panel {...componentConfig} className="flex flex-col">
      <div className="flex-grow flex justify-center items-center">
        <PanelMainText {...componentConfig}>
          {forecast.currently.temperature}
          <TempUnits unit={integrationConfig.unit} />
        </PanelMainText>
      </div>
      <H3 className="mb-0" margin={false}>
        Current temperature
      </H3>
    </Panel>
  );
});

export default (props: any) => (
  <IntegrationsWrapper>
    <CurrentTemp {...props} />
  </IntegrationsWrapper>
);
