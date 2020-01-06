import { createContext } from 'react';
import { observable, action, computed } from 'mobx';
import logger from 'utils/logger';
import { store as integrationsStore } from 'stores/integrations';
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
    const info = await this.getInfo(code);
    logger.debug('Google store insert - got tokens', info);
    const config = {
      ...info,
      name: info.user.email,
      image: info.user.picture
    };
    const integration = await integrationsStore.insert('google', config);
    this.integrations = this.integrations.concat(integration);
  };

  getInfo = (code: string) => {
    return fetch(`${origin}/google/info?code=${code}`).then((response: Response) => response.json());
  };

  getEvents = (integrationId: number, timeMin: string, timeMax: string) => {
    return fetch(
      `${origin}/google/calendar/events/${integrationId}?timeMin=${timeMin}&timeMax=${timeMax}`
    ).then((response: Response) => response.json());
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
