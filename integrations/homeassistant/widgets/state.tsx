import React, { useContext } from 'react';
import { useObserver } from 'mobx-react-lite';
import Panel from 'components/panel';
import PanelMainText from 'components/panelMainText';
import RequiresSettingIcon from 'components/requiresSettingsIcon';
import { StoreContext } from '../store';
import HomeAssistantWrapper from './_wrapper';

const useEntity = (entityId: string) => {
  const store = useContext(StoreContext);
  return useObserver(() => {
    return store.entities[entityId];
  });
};

const Inner = ({ widgetConfig }: IntegrationWidgetProps) => {
  const entity = useEntity(widgetConfig.entityId);
  console.log('Result', entity);
  if (!widgetConfig.entityId) {
    return (
      <Panel {...widgetConfig} className="flex flex-col items-center justify-center">
        <RequiresSettingIcon />
      </Panel>
    );
  }

  if (!entity) {
    return (
      <Panel {...widgetConfig} className="flex flex-col items-center justify-center">
        <PanelMainText {...widgetConfig}>--</PanelMainText>
      </Panel>
    );
  }

  <PanelMainText {...widgetConfig}>{entity.state}</PanelMainText>;
  const label = widgetConfig.label && widgetConfig.label.length ? widgetConfig.label : entity.attributes.friendly_name;
  return (
    <Panel {...widgetConfig} className="flex flex-col" label={label}>
      <PanelMainText {...widgetConfig}>{entity.state}</PanelMainText>
    </Panel>
  );
};

const State = (props: any) => {
  return (
    <HomeAssistantWrapper>
      <Inner {...props} />
    </HomeAssistantWrapper>
  );
};

export default State;
