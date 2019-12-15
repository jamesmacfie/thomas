import { createContext } from 'react';
import { observable, action } from 'mobx';
import logger from 'utils/logger';

export default class Store {
  @observable integrations: Integration[] | null = null;
  @observable forecasts: { [key: string]: DarkSkyForecast } = {};

  @action
  fetchIntegrations = async () => {
    logger.debug('Dark sky store fetchIntegrations');
    const integrations = await fetch(`${window.location.origin}/integrations/darksky`).then(res => res.json());

    logger.debug('Setting Darksky integrations', { integrations });
    this.integrations = integrations;

    if (integrations.length) {
      await this.updateForecast();
    }
  };

  @action
  updateForecast = async () => {
    logger.debug('Dark sky store updateForecast');
    if (!this.integrations) {
      logger.warn('No Dark sky integrations. Cannot update forecast');
      return;
    }
    await Promise.all(
      this.integrations.map(async i => {
        const forecast = await fetch(`${window.location.origin}/darksky/forecast/${i.id}`).then(res => res.json());
        logger.debug('Setting Darksky forecast', { id: i.id, forecast });
        this.forecasts[i.id] = forecast;
      })
    );
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
