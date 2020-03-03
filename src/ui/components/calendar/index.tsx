import React from 'react';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Event as CalendarEvent,
  View as CalendarView
} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.css';

interface Props {
  className?: string;
  events: CalendarEvent[];
  views?: [CalendarView];
}

const localizer = momentLocalizer(moment);
const Calendar = ({ className, events, views = ['week'] }: Props) => {
  return (
    <BigCalendar
      className={className}
      views={views}
      defaultView="week"
      localizer={localizer}
      events={events}
      step={60}
      popup
      showMultiDayTimes
    />
  );
};

export default Calendar;
