import React, { useState } from 'react';
import moment from 'moment';
import Panel from 'components/panel';
import PanelMainText from 'components/panelMainText';
import { H3 } from 'components/text';
import useInterval from 'hooks/useInterval';

const Digital = ({ widgetConfig }: IntegrationWidgetProps) => {
  const [date, setDate] = useState(moment());
  useInterval(() => {
    setDate(moment());
  }, 1000);

  const hours = date.format('HH');
  const minutes = date.format('mm');
  return (
    <Panel {...widgetConfig} className="flex flex-col items-center justify-center">
      <PanelMainText {...widgetConfig} increase={4}>
        {hours}
        <span className="blink-1">:</span>
        {minutes}
      </PanelMainText>
      <H3>{date.format('dddd, Do MMMM')}</H3>
    </Panel>
  );
};

export default Digital;
