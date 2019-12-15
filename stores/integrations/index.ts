import { createContext } from 'react';
import { observable, action } from 'mobx';
import { keyBy } from 'lodash';
import fetch from 'isomorphic-unfetch';
import { store as deviceStore } from 'stores/devices';
import logger from 'utils/logger';
import { origin } from 'utils/window';

export default class Store {
  @observable loaded: boolean = false;
  @observable integrations: { [key: string]: Integration } = {};
  @observable systemIntegrations: { [key: string]: SystemIntegration } = {};

  @action
  fetchSystem = async () => {
    logger.debug('Integrations store fetchOthers');
    const systemIntegrations = await fetch(`${origin}/system/integrations`).then(res => res.json());

    logger.debug('Setting systemIntegrations', { systemIntegrations });
    this.systemIntegrations = keyBy(systemIntegrations, 'slug');
    this.setLoadedIfReady();
  };

  @action
  fetch = async () => {
    logger.debug('Integrations store fetch');
    const integrations = await fetch(`${origin}/integrations`).then(res => res.json());

    logger.debug('Setting integrations', { integrations });
    this.integrations = keyBy(integrations, 'id');
    this.setLoadedIfReady();
  };

  setLoadedIfReady = () => {
    logger.debug('Integrations store setLoadedIfReady');
    this.loaded = !!this.systemIntegrations && !!this.integrations;
  };

  @action
  insert = async (slug: string, config: any) => {
    logger.debug('Integrations store insert', { slug, config });
    return fetch(`${origin}/integration`, {
      method: 'POST',
      body: JSON.stringify({
        deviceId: deviceStore.getDeviceId(),
        slug,
        config
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
  };

  @action
  update = async (id: number, config: any) => {
    logger.debug('Integrations store update', { id, config });
    await fetch(`${origin}/integration/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        config
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  };
}

export let store = new Store();

export const StoreContext = createContext(store);
