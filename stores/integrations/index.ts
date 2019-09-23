/// <reference path="../../types/typings.d.ts" /> #
import { createContext } from 'react';
import { observable } from 'mobx';
import { keyBy } from 'lodash';
import fetch from 'isomorphic-unfetch';
import { store as deviceStore } from 'stores/devices';

export default class Store {
  @observable loaded: boolean = false;
  @observable integrations: { [key: string]: Integration } = {};
  @observable systemIntegrations: { [key: string]: SystemIntegration } = {};

  getSystemIntegrations = () => {
    return fetch('http://localhost:3000/system/integrations')
      .then(res => res.json())
      .then((json: SystemIntegration[]) => {
        this.systemIntegrations = keyBy(json, 'slug');
        this.setLoadedIfReady();
      });
  };

  getIntegrations = () => {
    return fetch('http://localhost:3000/integrations')
      .then(res => res.json())
      .then((json: Integration[]) => {
        this.integrations = keyBy(json, 'id');
        this.setLoadedIfReady();
      });
  };

  setLoadedIfReady = () => {
    this.loaded = !!this.systemIntegrations && !!this.integrations;
  };

  saveNewIntegration = (slug: string, config: any) => {
    if (!deviceStore.getDeviceId()) {
      return Promise.resolve(false);
    }

    return fetch('http://localhost:3000/integration', {
      method: 'POST',
      body: JSON.stringify({
        deviceId: deviceStore.getDeviceId(),
        slug,
        config
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(() => {
        return true;
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  };

  updateExistingIntegration = (id: string, config: any) => {
    if (!deviceStore.getDeviceId()) {
      return Promise.resolve(false);
    }

    return fetch(`http://localhost:3000/integration/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        config
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(() => {
        return true;
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  };
}

export let store = new Store();

export const StoreContext = createContext(store);
