import { createContext } from 'react';
import { observable } from 'mobx';
import { store as integrationsStore } from '../integrations';
import { store as deviceStore } from 'stores/devices';
import { store as viewsStore } from 'stores/views';

const isServer = typeof window === 'undefined';

export default class Store {
  @observable loaded: boolean = false;
  @observable error: boolean = false;
  constructor() {
    if (isServer) {
      return;
    }

    Promise.all([
      integrationsStore.getIntegrations(),
      integrationsStore.getSystemIntegrations(),
      deviceStore.getOtherDevices(),
      viewsStore.getViews()
    ])
      .then(() => {
        this.loaded = true;
      })
      .catch(err => {
        console.error('Error loading all application data', err);
        this.error = true;
      });
  }
}

export let store = new Store();
export const StoreContext = createContext(store);
