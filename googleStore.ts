import { createContext } from 'react';
import moment from 'moment';
import { observable } from 'mobx';
import { useStaticRendering } from 'mobx-react-lite';
import fetch from 'isomorphic-unfetch';

type GoogleStatus = 'DEFAULT' | 'AUTHENTICATING' | 'POPULATING' | 'ERROR' | 'AUTHENTICATED' | 'REFRESHING';

const { API_URL } = process.env;

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

export default class GoogleStore {
  @observable status: GoogleStatus = 'DEFAULT';
  @observable fetching: boolean = false;
  @observable events: gapi.client.calendar.Event[] | null = null;
  @observable loginUrl: string = '';

  constructor() {
    this.getAndSetLoginUrl();
    this.getCurrentStatus();
  }

  getAndSetLoginUrl = () => {
    return fetch(`${API_URL}/google/login_url`)
      .then((response: Response) => response.json())
      .then((json: any) => {
        this.loginUrl = json.url;
      });
  };

  getCurrentStatus = () => {
    return fetch(`${API_URL}/google/status`).then((response: Response) => {
      if (response.status === 200 || response.status === 304) {
        console.log('Google auth Ok');
        this.status = 'AUTHENTICATED';
      }
    });
  };

  setAccessToken = (code: string) => {
    this.status = 'AUTHENTICATING';
    return fetch(`${API_URL}/google/token?code=${code}`).then((response: Response) => {
      if (response.status != 200) {
        this.status = 'ERROR';
      } else {
        this.status = 'AUTHENTICATED';
      }
    });
  };

  getEvents = (timeMin: string, timeMax: string) => {
    console.log('Getting events', timeMin, timeMax);
    this.fetching = true;
    return fetch(`${API_URL}/google/api/calendar/events?timeMin=${timeMin}&timeMax=${timeMax}`)
      .then((response: Response) => response.json())
      .then((json: { events: gapi.client.calendar.Event[] }) => {
        console.log('Got events', json);
        this.events = json.events;
        this.fetching = false;
      })
      .catch((err: Error) => {
        console.error('Error getting events', err);
        this.events = null;
        this.fetching = false;
      });
  };

  getThisMonthEvents = () => {
    const timeMin = moment()
      .startOf('month')
      .toISOString();
    const timeMax = moment()
      .endOf('month')
      .toISOString();
    return this.getEvents(timeMin, timeMax);
  };
}

let store: GoogleStore | null = null;
export function initializeGoogleStore() {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return new GoogleStore();
  }
  if (store === null) {
    store = new GoogleStore();
  }
  return store;
}

export const GoogleStoreContext = createContext(initializeGoogleStore());
