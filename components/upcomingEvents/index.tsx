import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import Panel from '../panel';
import { H4 } from '../text';
import GoogleStore from '../../googleStore';
import { GoogleStoreContext } from '../../googleStore';
import EmptyCalendar from '../../svg/halloween-calendar-ghost.svg';
import useInterval from '../../hooks/useInterval';

const getTimespan = () => {
  const timeMin = moment()
    .startOf('day')
    .toISOString();
  const timeMax = moment()
    .startOf('day')
    .add(10, 'days')
    .toISOString();

  return { timeMin, timeMax };
};

const UpcomingEvents = () => {
  const store = useContext(GoogleStoreContext) as GoogleStore;
  const [events, setEvents] = useState<gapi.client.calendar.Event[] | null>(null);

  useEffect(() => {
    const { timeMin, timeMax } = getTimespan();
    store.returnEvents(timeMin, timeMax).then(setEvents);
  }, [null]);
  useInterval(() => {
    console.log('GETTING');
    const { timeMin, timeMax } = getTimespan();
    store.returnEvents(timeMin, timeMax).then(setEvents);
  }, 1000 * 60);

  const styles = {
    width: '15rem'
  };

  if (events === null) {
    return (
      <Panel style={styles}>
        <H4 className="uppercase text-grey-dark">Upcoming events</H4>
      </Panel>
    );
  }

  if (!events.length) {
    return (
      <Panel style={styles}>
        <H4 className="uppercase text-grey-dark">Upcoming events</H4>
        <div className="pt-3 flex flex-col items-center">
          <EmptyCalendar className="text-white current-stroke center h-8 w-8" />
          <p className="text-base pt-2">There are no upcoming events</p>
        </div>
      </Panel>
    );
  }

  console.log(events);
  return (
    <Panel style={styles}>
      <H4 className="uppercase text-grey-dark">Upcoming events</H4>
      <p>Has events</p>
    </Panel>
  );
};
export default UpcomingEvents;
