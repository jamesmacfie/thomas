import { createContext } from 'react';
import { observable, action, computed } from 'mobx';
import logger from 'utils/logger';
import { origin } from 'utils/window';

export default class Store {
  @observable integrations: Integration[] = [];

  @computed get loaded() {
    return this.integrations.length;
  }
  getLoginUrl = async () => {
    logger.debug('Google calender store getLoginUrl');
    const url = await fetch(`${origin}/google/login_url`).then(res => res.text());

    return url;
  };

  @action
  insert = async (code: string) => {
    logger.debug('Google store insert', { code });
    const tokens = await this.getTokens(code);
    logger.debug('Google store insert - got tokens', { tokens });
  };

  getTokens = (code: string) => {
    return fetch(`${origin}/google/token?code=${code}`).then((response: Response) => response.text());
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
