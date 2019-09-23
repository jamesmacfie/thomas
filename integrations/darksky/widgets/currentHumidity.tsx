import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Panel from 'components/panel';
import PanelMainText from 'components/panelMainText';
import { StoreContext } from '../store';

const CurrentHumidity = observer(({ integrationId, widgetConfig }: IntegrationWidgetProps) => {
  const store = useContext(StoreContext);
  const forecast = store.forecasts[integrationId];

  if (!forecast) {
    return <Panel {...widgetConfig} label="Current humidity" />;
  }

  return (
    <Panel {...widgetConfig} className="flex flex-col" label="Current humidity">
      <PanelMainText {...widgetConfig}>{forecast.currently.humidity}%</PanelMainText>
    </Panel>
  );
});

export default CurrentHumidity;
