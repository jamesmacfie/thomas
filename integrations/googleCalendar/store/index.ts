import { createContext } from 'react';
import logger from 'utils/logger';

export default class Store {
  getLoginUrl = async () => {
    logger.debug('Google calender store getLoginUrl');
    const url = await fetch(`${window.location.origin}/google_calendar/login_url`).then(res => res.text());

    return url;
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
