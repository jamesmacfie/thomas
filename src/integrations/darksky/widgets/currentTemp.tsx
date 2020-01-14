import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Panel from 'components/panel';
import PanelMainText from 'components/panelMainText';
import IntegrationsWrapper from './integrationsWrapper';
import { StoreContext } from '../store';
import TempUnits from './_tempUnits';

const CurrentTemp = observer(({ integrationId, widgetConfig, integrationConfig }: IntegrationWidgetProps) => {
  const store = useContext(StoreContext);
  const forecast = store.forecasts[integrationId];

  if (!forecast) {
    return <Panel {...widgetConfig} label="Current temperature" />;
  }

  return (
    <Panel {...widgetConfig} label="Current temperature">
      <PanelMainText {...widgetConfig}>
        {forecast.currently.temperature}
        <TempUnits units={integrationConfig.units} />
      </PanelMainText>
    </Panel>
  );
});

export default (props: any) => (
  <IntegrationsWrapper>
    <CurrentTemp {...props} />
  </IntegrationsWrapper>
);
