import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Loader from '../loader';
import GoogleStore from '../../googleStore';
import { GoogleStoreContext } from '../../googleStore';
import { useCalendarNavigate } from '../../hooks/useCalendarNavigate';

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
  const mushed = events.map(event => {
    return {
      id: event.id,
      title: event.summary,
      allDay: event.start && event.start.date,
      start: event.start ? event.start.dateTime || event.start.date : null,
      end: event.end ? event.end.dateTime || event.start!.date : null // TODO - this is a hack. Do a better test, currently using start date for all date events
    };
  });

  console.log('Mushed events', mushed);
  return mushed;
};

const GoogleCalendar = observer(({ className }: Props) => {
  const store = useContext(GoogleStoreContext) as GoogleStore;
  useEffect(() => {
    // store.getThisMonthEvents();
  }, []);
  const { navigate } = useCalendarNavigate({
    date: new Date(),
    viewType: 'month'
  });

  if (store.events) {
    return (
      <BigCalendar
        views={['month', 'agenda']}
        onNavigate={navigate}
        localizer={localizer}
        events={mushEvents(store.events)}
        step={60}
        showMultiDayTimes
      />
    );
  }

  if (store.fetching) {
    return <Loader />;
  }

  if (store.status === 'DEFAULT') {
    return (
      <Link href="/settings/accounts">
        <a>Login to show the calendar</a>
      </Link>
    );
  }

  if (!store.events) {
    return <p>No events</p>;
  }
  return <p className={className}>Some events</p>;
});

export default GoogleCalendar;
