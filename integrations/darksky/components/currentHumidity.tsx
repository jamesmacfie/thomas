import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import Panel from 'components/panel';
import { H3 } from 'components/text';
import PanelMainText from 'components/panelMainText';
import IntegrationsWrapper from './integrationsWrapper';
import { StoreContext } from '../store';

const CurrentHumidity = observer(({ integrationId, componentConfig }: IntegrationComponentProps) => {
  const store = useContext(StoreContext);
  const forecast = store.forecasts[integrationId];

  console.log(toJS(componentConfig));

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
        <PanelMainText {...componentConfig}>{forecast.currently.humidity}%</PanelMainText>
      </div>
      <H3 className="mb-0" margin={false}>
        Current humidity
      </H3>
    </Panel>
  );
});

export default (props: any) => (
  <IntegrationsWrapper>
    <CurrentHumidity {...props} />
  </IntegrationsWrapper>
);
