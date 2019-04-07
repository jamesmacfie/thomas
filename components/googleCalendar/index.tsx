import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Loader from '../loader';
import GoogleStore from '../../googleStore';
import { GoogleStoreContext } from '../../googleStore';

interface Props {
  className?: string;
}

// interface BigCalendarEvent {
//   id: number;
//   title: string;
//   allDay: boolean;
//   start?: Date;
//   end?: Date;
// }

const localizer = BigCalendar.momentLocalizer(moment);
const mushEvents = (events: gapi.client.calendar.Event[]): any[] => {
  console.log(events);
  const mushed = events.map(event => {
    return {
      id: event.id,
      title: event.description,
      allDay: false,
      start: event.start ? event.start.dateTime : null,
      end: event.end ? event.end.dateTime : null
    };
  });

  return mushed;
};

const GoogleCalendar = observer(({ className }: Props) => {
  const store = useContext(GoogleStoreContext) as GoogleStore;
  useEffect(() => {
    store.getThisMonthEvents();
  }, []);

  if (store.events) {
    return <BigCalendar localizer={localizer} events={mushEvents(store.events)} step={60} showMultiDayTimes />;
  }

  if (store.fetching) {
    return <Loader />;
  }

  if (!store.events) {
    return <p>No events</p>;
  }
  return <p className={className}>Some events</p>;
});

export default GoogleCalendar;
