import React from 'react';
import moment from 'moment';
import NextMeeting from 'components/nextMeeting';
import { useNextCalendarEvent } from '../store/hooks';

const Next = ({ integrationId, widgetConfig }: IntegrationWidgetProps) => {
  const [event, loading] = useNextCalendarEvent(integrationId);

  if (loading) {
    return <NextMeeting />;
  }

  if (!event) {
    return <NextMeeting title="No upcoming events" />;
  }

  const isToday = moment()
    .endOf('day')
    .isAfter(event.start?.date || event.start?.dateTime);
  if (!isToday && widgetConfig.todayOnly) {
    return <NextMeeting title="No events today" />;
  }

  return <NextMeeting title={event?.summary} start={event.start?.date || event.start?.dateTime} />;
};

export default Next;
