import { createContext } from 'react';
import { observable } from 'mobx';
import { store as configStore } from 'stores/config';
import { store as integrationsStore } from '../integrations';
import { store as deviceStore } from 'stores/devices';
import { store as viewsStore } from 'stores/views';
import { store as developerStore } from 'stores/developer';
import logger from 'utils/logger';

const isServer = typeof window === 'undefined';

export default class Store {
  @observable loaded: boolean = false;
  @observable error: boolean = false;
  constructor() {
    if (isServer) {
      logger.debug('Application store - not loading, server rendered');
      return;
    }

    Promise.all([
      configStore.fetchAll(),
      integrationsStore.fetch(),
      integrationsStore.fetchSystem(),
      deviceStore.fetchAll(),
      viewsStore.fetchAll(),
      developerStore.initSettings()
    ])
      .then(() => {
        logger.debug('Application store all loaded successfully');
        this.loaded = true;
      })
      .catch(error => {
        logger.error('Error loading all application data', { error });
        this.error = true;
      });
  }
}

export let store = new Store();
export const StoreContext = createContext(store);
