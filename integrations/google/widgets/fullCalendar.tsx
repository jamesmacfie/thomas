import React from 'react';
import { getDateRangeByType } from './_date';
import Loader from 'components/loader';
import { useCalendarEvents } from '../store/hooks';

const Full = ({ integrationId, widgetConfig }: IntegrationWidgetProps) => {
  const view = widgetConfig.view ? widgetConfig.view : 'monthly';
  const { timeMin, timeMax } = getDateRangeByType(view);
  const [events, loading] = useCalendarEvents(integrationId, timeMin, timeMax);

  if (loading) {
    return <Loader />;
  }

  console.log('Events!', events);

  return <p>Full calendar</p>;
};

export default Full;
