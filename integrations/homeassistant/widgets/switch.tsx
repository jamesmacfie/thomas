import React from 'react';
import { store } from '../store';
import { useIntegrationEntity } from '../store/hooks';
import { useEditMode } from 'stores/ui/hooks';
import Icon from 'components/icon';
import Panel from 'components/panel';
import PanelMainText from 'components/panelMainText';
import RequiresSettingIcon from 'components/requiresSettingsIcon';
import HomeAssistantWrapper from './_wrapper';

const Inner = ({ widgetConfig, integrationId }: IntegrationWidgetProps) => {
  const entity = useIntegrationEntity(integrationId, widgetConfig.entityId);
  const editMode = useEditMode();
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

  const onClick = () => {
    if (editMode) {
      return;
    }

    const group = entity.entity_id.split('.')[0];
    let service = 'toggle';
    let domain = 'homeassistant';

    if (entity.state === 'off') {
      service = 'turn_on';
    } else if (entity.state === 'on') {
      service = 'turn_off';
    }

    if (['switch', 'light', 'fan'].indexOf(group) !== -1) {
      domain = group;
    }

    const dataToSend = {
      type: 'call_service',
      domain,
      service,
      service_data: {
        entity_id: entity.entity_id
      }
    };

    store.websocketSendByIntegrationId(integrationId, dataToSend);
  };

  const label = widgetConfig.label && widgetConfig.label.length ? widgetConfig.label : entity.attributes.friendly_name;
  return (
    <Panel onClick={onClick} {...widgetConfig} className="flex flex-col cursor-pointer" label={label}>
      <Icon icon={icon as any} className="text-5xl" />
    </Panel>
  );
};

const Switch = (props: any) => {
  return (
    <HomeAssistantWrapper>
      <Inner {...props} />
    </HomeAssistantWrapper>
  );
};

export default Switch;
