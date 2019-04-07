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

  @observable loginUrl: string = '';

  constructor() {
    this.getAndSetLoginUrl();
  }

  getAndSetLoginUrl = () => {
    return fetch(`${API_URL}/google/login_url`)
      .then((response: Response) => response.json())
      .then((json: any) => {
        console.log('got', json);
        this.loginUrl = json.url;
      });
  };

  setAccessToken = (code: string) => {
    this.status = 'AUTHENTICATING';
    return fetch(`${API_URL}/google/token?code=${code}`)
      .then((response: Response) => response.json())
      .then((json: any) => {
        console.log('Google URL ok', json);
        this.status = 'AUTHENTICATED';
      });
  };

  getThisMonthEvents = () => {
    const timeMin = moment()
      .startOf('month')
      .toISOString();
    const timeMax = moment()
      .endOf('month')
      .toISOString();
    return fetch(`${API_URL}/google/api/calendar/events?timeMin=${timeMin}&timeMax=${timeMax}`)
      .then((response: Response) => response.json())
      .then((json: any) => {
        console.log('Got events', json);
        return json;
      });
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
