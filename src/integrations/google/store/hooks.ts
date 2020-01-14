import { useEffect, useState } from 'react';
import { store } from '.';
import logger from 'utils/logger';

// TODO - needs a failure state
export const useCalendarEvents = (integrationId: number, timeMin: string, timeMax: string) => {
  const [events, setEvents] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      logger.debug('Fetching Google calendar events', { integrationId, timeMin, timeMax });
      setLoading(true);
      const events = await store.getEvents(integrationId, timeMin, timeMax);
      setEvents(events);
      setLoading(false);
    };

    fetchEvents();
  }, [integrationId, timeMin, timeMax]);

  return [events, loading];
};
