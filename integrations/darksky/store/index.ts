import { createContext } from 'react';
import { observable } from 'mobx';

// TODO - this can be cleaned up now
export default class Store {
  @observable integrations: Integration[] | null = null;
  @observable forecasts: any = {};

  getIntegrations = async () => {
    const integrations = await fetch(`http://localhost:3000/integrations/darksky`).then(res => res.json());
    this.integrations = integrations;

    if (integrations.length) {
      await this.updateForecast();
    }
  };

  updateForecast = async () => {
    if (!this.integrations) {
      return;
    }
    await Promise.all(
      this.integrations.map(async i => {
        const forecast = await fetch(`http://localhost:3000/darksky/forecast/${i.id}`).then(res => res.json());
        this.forecasts[i.id] = forecast;
      })
    );
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
