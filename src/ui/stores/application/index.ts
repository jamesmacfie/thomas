import { createContext } from 'react';
import { observable } from 'mobx';
import { store as configStore } from 'stores/config';
import { store as integrationsStore } from '../integrations';
import { store as deviceStore } from 'stores/devices';
import { store as viewsStore } from 'stores/views';
import { store as developerStore } from 'stores/developer';
import logger from 'utils/logger';

export default class Store {
  @observable loaded: boolean = false;
  @observable error: boolean = false;
  constructor() {
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
