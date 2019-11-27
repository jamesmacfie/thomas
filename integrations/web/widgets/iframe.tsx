import React from 'react';
import RequiresSettingIcon from 'components/requiresSettingsIcon';
import Panel from 'components/panel';

export default ({ widgetConfig }: IntegrationWidgetProps) => {
  if (!widgetConfig.url || !widgetConfig.url.length) {
    return (
      <Panel {...widgetConfig} className="flex flex-col items-center justify-center">
        <RequiresSettingIcon />
      </Panel>
    );
  }
  return (
    <Panel {...widgetConfig} padding={false} className="overflow-hidden">
      <iframe src={widgetConfig.url} className="w-full h-full" />
    </Panel>
  );
};
