import React from 'react';
import moment from 'moment';
import { Event as CalendarEvent } from 'react-big-calendar';
import Panel from 'components/panel';
import Calendar from 'components/calendar';
import { useCalendarEvents } from '../store/hooks';

const mushEvents: (events: gapi.client.calendar.Event[]) => CalendarEvent[] = events => {
  return events
    .map(e => {
      if (!e.start || !e.end) {
        return {};
      }

      const allDay = e.start.date && e.end.date;
      const start = allDay ? e.start.date : e.start.dateTime;
      const end = allDay
        ? moment(e.end.date)
            .subtract('day', 1)
            .toISOString()
        : e.end.dateTime;
      return {
        title: e.summary,
        allDay: allDay,
        start: new Date(start as string),
        end: new Date(end as string)
      } as CalendarEvent;
    })
    .filter(e => e !== null);
};

const Next = ({ integrationId, widgetConfig }: IntegrationWidgetProps) => {
  const timeMin = moment()
    .startOf('week')
    .toISOString();
  const timeMax = moment()
    .endOf('week')
    .toISOString();

  const [events] = useCalendarEvents(integrationId, timeMin, timeMax);
  console.log(mushEvents(events));
  return (
    <Panel {...widgetConfig} transparentBackground={true}>
      <Calendar events={mushEvents(events)} />
    </Panel>
  );
};

export default Next;
