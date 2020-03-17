import React, { useState } from 'react';
import Panel from 'components/panel';
import PanelMainText from 'components/panelMainText';
import RequiresSettingIcon from 'components/requiresSettingsIcon';
import { useEditMode } from 'stores/ui/hooks';
import { useIntegrationEntity } from '../../store/hooks';
import { store } from '../../store';
import HomeAssistantWrapper from '../_wrapper';
import Climate from 'components/climate';

import { toJS } from 'mobx';

const Inner = ({ widgetConfig, integrationId }: IntegrationWidgetProps) => {
  const entity = useIntegrationEntity(integrationId, widgetConfig.entityId);
  const [active, setActive] = useState(entity ? entity.state !== 'off' : false);
  const [targetTemp, setTargetTemp] = useState<number | null>(null);
  const [fanMode, setFanMode] = useState<string | null>(null);
  const editMode = useEditMode();

  const onToggle = (newActive: boolean) => {
    if (editMode || !entity) {
      return;
    }

    const dataToSend = {
      type: 'call_service',
      domain: 'climate',
      service: `turn_${!active ? 'on' : 'off'}`,
      service_data: {
        entity_id: entity.entity_id
      }
    };

    store.websocketSendByIntegrationId(integrationId, dataToSend);
    setActive(newActive);
  };

  if (!widgetConfig.entityId) {
    return (
      <Panel {...widgetConfig} className="flex flex-col items-center justify-center">
        <RequiresSettingIcon />
      </Panel>
    );
  }

  if (!entity) {
    console.log('No entity');
    return (
      <Panel {...widgetConfig} className="flex flex-col items-center justify-center">
        <PanelMainText {...widgetConfig}>--</PanelMainText>
      </Panel>
    );
  }

  console.log('ENTITY', toJS(entity));

  const onFanModeChange = (newFanMode: string) => {
    if (editMode || !entity) {
      return;
    }

    const dataToSend = {
      type: 'call_service',
      domain: 'climate',
      service: `set_fan_mode`,
      service_data: {
        entity_id: entity.entity_id,
        fan_mode: newFanMode
      }
    };

    console.log(dataToSend);

    store.websocketSendByIntegrationId(integrationId, dataToSend);

    setFanMode(newFanMode);
  };

  const onTempChange = (newTarget: number) => {
    if (editMode || !entity) {
      return;
    }

    const dataToSend = {
      type: 'call_service',
      domain: 'climate',
      service: `set_temperature`,
      service_data: {
        entity_id: entity.entity_id,
        temperature: newTarget
      }
    };

    store.websocketSendByIntegrationId(integrationId, dataToSend);

    setTargetTemp(newTarget);
  };

  const panelProps = {
    ...widgetConfig,
    className: 'pb-8',
    label: widgetConfig.label
  };

  return (
    <Climate
      panelProps={panelProps}
      setTarget={onTempChange}
      isActive={active}
      onToggle={onToggle}
      minTemp={entity.attributes.min_temp as number}
      maxTemp={entity.attributes.max_temp as number}
      fanMode={fanMode ? fanMode : (entity.attributes.fan_mode as string)}
      setFanMode={onFanModeChange}
      targetTemp={targetTemp ? targetTemp : (entity.attributes.temperature as number)}
    />
  );
};

const HAClimate = (props: any) => {
  return (
    <HomeAssistantWrapper>
      <Inner {...props} />
    </HomeAssistantWrapper>
  );
};

export default HAClimate;
