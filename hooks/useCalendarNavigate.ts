import { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import GoogleStore from '../googleStore';
import { GoogleStoreContext } from '../googleStore';
import { View, Navigate } from 'react-big-calendar';

interface CalendarNavigateOptions {
  date: Date;
  viewType: View;
  action?: Navigate;
}

export const useCalendarNavigate = (opts: CalendarNavigateOptions) => {
  const [options, setOptions] = useState(opts);
  const store = useContext(GoogleStoreContext) as GoogleStore;
  useEffect(() => {
    const timeMin = moment(options.date)
      .startOf('month')
      .toISOString();
    const timeMax = moment(options.date)
      .endOf('month')
      .toISOString();
    store.getEvents(timeMin, timeMax);
  }, [options]);

  const navigate = (date: Date, viewType: View, action: Navigate) => {
    setOptions({ date, viewType, action });
  };

  return { navigate };
};
