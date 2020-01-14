import React from 'react';
import { useIntegrationEntity } from '../store/hooks';
import Icon from 'components/icon';
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

  let icon = 'question-mark';
  if (entity.state === 'on') {
    icon = widgetConfig.onIcon;
  } else if (entity.state === 'off') {
    icon = widgetConfig.offIcon;
  }

  const label = widgetConfig.label && widgetConfig.label.length ? widgetConfig.label : entity.attributes.friendly_name;
  return (
    <Panel {...widgetConfig} className="flex flex-col" label={label}>
      <Icon icon={icon as any} className="w5 h5" />
    </Panel>
  );
};

const HAIcon = (props: any) => {
  return (
    <HomeAssistantWrapper>
      <Inner {...props} />
    </HomeAssistantWrapper>
  );
};

export default HAIcon;
