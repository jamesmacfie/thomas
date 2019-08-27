/// <reference path="../../types/typings.d.ts" /> #
// ^ How do I get rid of that?

import { createContext } from 'react';
import { observable } from 'mobx';
import { keyBy } from 'lodash';
import fetch from 'isomorphic-unfetch';
import { store as deviceStore } from 'stores/device';

export default class Store {
  @observable integrations: any | null = null;
  @observable systemIntegrations: any | null = null;

  getSystemIntegrations = () => {
    return fetch('http://localhost:3000/system/integrations')
      .then(res => res.json())
      .then((json: SystemIntegration[]) => {
        this.systemIntegrations = keyBy(json, 'slug');
      });
  };

  getIntegrations = () => {
    return fetch('http://localhost:3000/integrations')
      .then(res => res.json())
      .then((json: Integration[]) => {
        this.integrations = keyBy(json, 'id');
      });
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
