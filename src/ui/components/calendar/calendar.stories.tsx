import React from 'react';
import { Event as CalendarEvent } from 'react-big-calendar';
import faker from 'faker';
import moment from 'moment';
import Calendar from '.';

export default {
  title: 'Calendar',
  component: Calendar
};

const getRandomWeekEvent: () => CalendarEvent = () => {
  const hour = faker.random.number(24);
  const daysToAdd = faker.random.number(4);
  const daysToRemove = faker.random.number(4);
  const startDate = moment()
    .set('hour', hour)
    .set('minute', 0)
    .add('day', daysToAdd)
    .subtract('day', daysToRemove);
  const endDate = moment()
    .set('hour', hour)
    .set('minute', 30)
    .add('day', daysToAdd)
    .subtract('day', daysToRemove);
  return {
    allDay: false,
    start: startDate.toDate(),
    end: endDate.toDate(),
    title: faker.random.word()
  };
};

export const Default = () => {
  const eventCount = faker.random.number(10);
  const events: CalendarEvent[] = [];
  for (var i = 0; i < eventCount; i++) {
    events.push(getRandomWeekEvent());
  }
  return <Calendar events={events} />;
};

Default.story = {
  name: 'Default'
};
