import React, { useState } from 'react';
import Panel from 'components/panel';
import Switch from 'components/switch';
import { H3 } from 'components/text';
import PanelMainText from 'components/panelMainText';
import RequiresSettingIcon from 'components/requiresSettingsIcon';
import { useEditMode } from 'stores/ui/hooks';
import { useIntegrationEntity } from '../../store/hooks';
import { store } from '../../store';
import HomeAssistantWrapper from '../_wrapper';
import ClimateTemps from './_temps';
import './styles.css';

// import { toJS } from 'mobx';

const Inner = ({ widgetConfig, integrationId }: IntegrationWidgetProps) => {
  const entity = useIntegrationEntity(integrationId, widgetConfig.entityId);
  const [active, setActive] = useState(entity ? entity.state === 'on' : false);
  const editMode = useEditMode();

  const onSwitch = (newActive: boolean) => {
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

    console.log(dataToSend);
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
    return (
      <Panel {...widgetConfig} className="flex flex-col items-center justify-center">
        <PanelMainText {...widgetConfig}>--</PanelMainText>
      </Panel>
    );
  }

  return (
    <Panel {...widgetConfig} className="pb-8" label={widgetConfig.label}>
      <div className="flex flex-col w-full max-h-full">
        <div className="flex-grow flex justify-center overflow-hidden relative">
          <div className="w-32 max-h-full overflow-scroll ">
            <div className="pointer-events-none absolute-center-h w-32 top-0 h-1/2 climate-scroll-top" />
            <ClimateTemps
              min={entity.attributes.min_temp}
              max={entity.attributes.max_temp}
              target={entity.attributes.temperature}
            />
            <div className="pointer-events-none absolute-center-h w-32 bottom-0 h-1/2 climate-scroll-bottom" />
          </div>
        </div>
        <div className="h-24 flex-shrink-0 flex pt-3">
          <div className="flex-grow flex flex-col items-center">
            <Switch active={active} onChange={onSwitch} />
            <H3 className="mb-0 mt-2" margin={false}>
              {active ? 'ON' : 'OFF'}
            </H3>
          </div>
          <div className="flex-grow flex flex-col items-center">
            <Switch active={active} onChange={onSwitch} />
            <H3 className="mb-0 mt-2" margin={false}>
              {active ? 'ON' : 'OFF'}
            </H3>
          </div>
        </div>
      </div>
    </Panel>
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
