import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import GoogleCalendarViewMore from './viewMore';
import Loader from '../loader';
import GoogleStore from '../../googleStore';
import { GoogleStoreContext } from '../../googleStore';
import { useCalendarNavigate } from '../../hooks/useCalendarNavigate';

export interface MushEvent {
  id?: string;
  title?: string;
  allDay: boolean;
  start: Date | null;
  end: Date | null;
  event: gapi.client.calendar.Event;
}

interface Props {
  className?: string;
}

const localizer = BigCalendar.momentLocalizer(moment);

// Times for week view
const minTime = new Date();
minTime.setHours(8, 30, 0);
const maxTime = new Date();
maxTime.setHours(20, 30, 0);

const mushEvents = (events: gapi.client.calendar.Event[]): MushEvent[] => {
  const mushed = events.map(event => {
    const start = event.start ? event.start.dateTime || event.start.date : null;
    const end = event.end ? event.end.dateTime || event.start!.date : null; // TODO - this is a hack. Do a better test, currently using start date for all date events
    return {
      id: event.id,
      title: event.summary,
      allDay: !!(event.start && event.start.date),
      start: start ? new Date(start) : null,
      end: end ? new Date(end) : null,
      event
    };
  });

  return mushed;
};

const GoogleCalendar = observer(({ className }: Props) => {
  const store = useContext(GoogleStoreContext) as GoogleStore;
  const [selectedEvent, setSelectedEvent] = useState<MushEvent | null>(null);

  const { navigate } = useCalendarNavigate({
    date: new Date(),
    viewType: 'month'
  });

  const onSelectEvent = (event: MushEvent) => {
    setSelectedEvent(event);
  };

  if (store.events) {
    return (
      <>
        {selectedEvent && <GoogleCalendarViewMore event={selectedEvent} onClick={() => setSelectedEvent(null)} />}
        <BigCalendar
          views={['month', 'week', 'agenda']}
          defaultView="week"
          min={minTime}
          max={maxTime}
          onNavigate={navigate}
          localizer={localizer}
          events={mushEvents(store.events)}
          step={60}
          popup
          onSelectEvent={onSelectEvent}
          showMultiDayTimes
        />
      </>
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
