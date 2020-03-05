import React from 'react';
import NextMeeting from 'components/nextMeeting';
import { useNextCalendarEvent } from '../store/hooks';

const Next = ({ integrationId }: IntegrationWidgetProps) => {
  const [event, loading] = useNextCalendarEvent(integrationId);

  if (loading) {
    return <NextMeeting />;
  }

  if (!event) {
    return <NextMeeting title="No upcoming meetings" />;
  }

  console.log(event);

  return <NextMeeting title={event?.summary} start={event.start?.date || event.start?.dateTime} />;
};

export default Next;
