import { createContext } from 'react';
import { observable, action } from 'mobx';
import { keyBy } from 'lodash';
import fetch from 'isomorphic-unfetch';
import logger from 'utils/logger';

export default class Store {
  @observable configs: { [key: string]: Config } = {};

  constructor() {
    this.fetchAll();
  }

  @action
  fetchAll = async () => {
    logger.debug('Config store fetchAll');
    const configs = await fetch(`${window.location.origin}/configs`).then(res => res.json());
    logger.debug('Setting configs', { configs });
    this.configs = keyBy(configs, 'slug');
  };

  @action
  insert = async (values: { slug: string; description?: string; value: any }) => {
    logger.debug('Config store insert', { values });
    const config: Config = await fetch(`/config`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(res => res.json());
    logger.debug('config inserted, setting device Id ', { config });
    this.configs[values.slug] = config;
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
