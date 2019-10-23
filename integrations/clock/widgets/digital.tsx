import React, { useState } from 'react';
import moment from 'moment';
import Panel from 'components/panel';
import PanelMainText from 'components/panelMainText';
import useInterval from 'hooks/useInterval';

const Digital = ({ widgetConfig }: IntegrationWidgetProps) => {
  const [date, setDate] = useState(moment());
  useInterval(() => {
    setDate(moment());
  }, 1000);

  const hours = date.format('HH');
  const minutes = date.format('mm');
  return (
    <Panel {...widgetConfig} className="flex items-center justify-center">
      <PanelMainText {...widgetConfig} increase={4}>
        {hours}
        <span className="blink-1">:</span>
        {minutes}
      </PanelMainText>
    </Panel>
  );
};

export default Digital;
