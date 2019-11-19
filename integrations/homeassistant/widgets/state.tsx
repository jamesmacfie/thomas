import React from 'react';
import { useIntegrationEntity } from '../store/hooks';
import Panel from 'components/panel';
import PanelMainText from 'components/panelMainText';
import RequiresSettingIcon from 'components/requiresSettingsIcon';
import HomeAssistantWrapper from './_wrapper';

const Inner = ({ widgetConfig, integrationId }: IntegrationWidgetProps) => {
  const entity = useIntegrationEntity(integrationId, widgetConfig.entityId);
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

  const label = widgetConfig.label && widgetConfig.label.length ? widgetConfig.label : entity.attributes.friendly_name;
  let state;
  if (widgetConfig.state && widgetConfig.state.length) {
    state = entity.attributes[widgetConfig.state];
  } else {
    state = entity.state;
  }
  return (
    <Panel {...widgetConfig} className="flex flex-col" label={label}>
      <PanelMainText {...widgetConfig}>{state}</PanelMainText>
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
