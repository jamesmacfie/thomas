import { useEffect, useState } from 'react';
import { store } from '../store';
import logger from 'utils/logger';

// TODO - needs a failure state
export const useCalendarEvents: (
  integrationId: number,
  timeMin: string,
  timeMax: string
) => [gapi.client.calendar.Event[], boolean] = (integrationId, timeMin, timeMax) => {
  const [events, setEvents] = useState<gapi.client.calendar.Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      logger.debug('Fetching Google calendar events', { integrationId, timeMin, timeMax });
      setLoading(true);
      const data = await store.getEvents(integrationId, timeMin, timeMax);
      setEvents(data.events);
      setLoading(false);
    };

    fetchEvents();
  }, [integrationId, timeMin, timeMax]);

  return [events, loading];
};

export const useNextCalendarEvent: (
  integrationId: number
) => [gapi.client.calendar.Event | null, boolean] = integrationId => {
  const [event, setEvent] = useState<gapi.client.calendar.Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      logger.debug('Fetching next Google calendar event', { integrationId });
      setLoading(true);
      const event = await store.getNextEvent(integrationId);
      setEvent(event);
      setLoading(false);
    };

    fetchEvents();
  }, [integrationId]);

  return [event, loading];
};
