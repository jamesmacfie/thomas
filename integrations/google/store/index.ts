import { createContext } from 'react';
import logger from 'utils/logger';
import { origin } from 'utils/window';

export default class Store {
  getLoginUrl = async () => {
    logger.debug('Google calender store getLoginUrl');
    const url = await fetch(`${origin}/google/login_url`).then(res => res.text());

    return url;
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
