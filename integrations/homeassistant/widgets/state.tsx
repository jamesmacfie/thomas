import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import Panel from 'components/panel';
import PanelMainText from 'components/panelMainText';
import { StoreContext } from '../store';
import HomeAssistantWrapper from './_wrapper';

const Inner = observer(({ widgetConfig }: IntegrationWidgetProps) => {
  const store = useContext(StoreContext);
  if (!widgetConfig.entityId) {
    return (
      <Panel {...widgetConfig} className="flex flex-col items-center justify-center">
        Nope
      </Panel>
    );
  }

  const entity = store.entities[widgetConfig.entityId];
  if (!entity) {
    return (
      <Panel {...widgetConfig} className="flex flex-col items-center justify-center">
        No info
      </Panel>
    );
  }

  <PanelMainText {...widgetConfig}>{entity.state}</PanelMainText>;
  const label = widgetConfig.label && widgetConfig.label.length ? widgetConfig.label : entity.attributes.friendly_name;
  console.log(toJS(entity));
  return (
    <Panel {...widgetConfig} className="flex flex-col" label={label}>
      <PanelMainText {...widgetConfig}>{entity.state}</PanelMainText>
    </Panel>
  );
});

const State = (props: any) => {
  return (
    <HomeAssistantWrapper>
      <Inner {...props} />
    </HomeAssistantWrapper>
  );
};

export default State;
