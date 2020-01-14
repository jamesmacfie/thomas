import React, { useState } from 'react';
import moment from 'moment';
import Panel from 'components/panel';
import PanelMainText from 'components/panelMainText';
import { H3 } from 'components/text';
import useInterval from 'hooks/useInterval';
import logger from 'utils/logger';

const getTimeFormat: (widgetConfig: WidgetConfig) => [string, string] = widgetConfig => {
  const defaultFormat = ['h', 'mm a'];
  if (!widgetConfig.timeFormat) {
    // Default to 12 hours
    return defaultFormat;
  }

  try {
    return widgetConfig.timeFormat.split(':');
  } catch (err) {
    logger.warn('Error decoding time format for digital clock. Defaulting');
    return defaultFormat;
  }
};

const Digital = ({ widgetConfig }: IntegrationWidgetProps) => {
  const [date, setDate] = useState(moment());
  useInterval(() => {
    setDate(moment());
  }, 1000);

  const timeSplit = getTimeFormat(widgetConfig);
  const dateFormat = widgetConfig.dateFormat ? widgetConfig.dateFormat : 'dddd, Do MMMM';
  const hours = date.format(timeSplit[0]);
  const minutes = date.format(timeSplit[1]);
  return (
    <Panel {...widgetConfig} className="flex flex-col items-center justify-center">
      <PanelMainText {...widgetConfig} increase={2}>
        {hours}
        <span className="blink-1">:</span>
        {minutes}
      </PanelMainText>
      <H3>{date.format(dateFormat)}</H3>
    </Panel>
  );
};

export default Digital;
