import React from 'react';
// import { useIntegrationEntity } from '../store/hooks';
// import Icon from 'components/icon';
import Panel from 'components/panel';
// import PanelMainText from 'components/panelMainText';
// import RequiresSettingIcon from 'components/requiresSettingsIcon';
import HomeAssistantWrapper from '../_wrapper';
import ClimateTemps from './_temps';
import './styles.css';

const Inner = ({ widgetConfig }: IntegrationWidgetProps) => {
  // const entity = useIntegrationEntity(integrationId, widgetConfig.entityId);
  // if (!widgetConfig.entityId) {
  //   return (
  //     <Panel {...widgetConfig} className="flex flex-col items-center justify-center">
  //       <RequiresSettingIcon />
  //     </Panel>
  //   );
  // }

  // if (!entity) {
  //   return (
  //     <Panel {...widgetConfig} className="flex flex-col items-center justify-center">
  //       <PanelMainText {...widgetConfig}>--</PanelMainText>
  //     </Panel>
  //   );
  // }

  return (
    <Panel {...widgetConfig} className="pb-8" label={widgetConfig.label}>
      <div className="flex flex-col w-full max-h-full">
        <div className="flex-grow flex justify-center overflow-hidden relative">
          <div className="w-32 max-h-full overflow-scroll ">
            <div className="pointer-events-none absolute-center-h w-32 top-0 h-1/2 climate-scroll-top" />
            <ClimateTemps current={18} />
            <div className="pointer-events-none absolute-center-h w-32 bottom-0 h-1/2 climate-scroll-bottom" />
          </div>
        </div>
        <div className="h-12 flex-shrink-0">
          <p>Bottom</p>
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
