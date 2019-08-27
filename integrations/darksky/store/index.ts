import { createContext } from 'react';
import { observable } from 'mobx';
import { useStaticRendering } from 'mobx-react-lite';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

export default class Store {
  @observable integrations: Integration[] | null = null;
  @observable forecasts: any = {};

  getIntegrations = async () => {
    const integrations = await fetch(`http://localhost:3000/integrations/darksky`).then(res => res.json());
    this.integrations = integrations;

    if (integrations.length) {
      console.log('Have darksky integrations. Updating');
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
        console.log('Got forecast', forecast);
        this.forecasts[i.id] = forecast;
      })
    );
  };
}

let store: Store | null = null;
export function initializeStore() {
  if (isServer) {
    return new Store();
  }
  if (store === null) {
    store = new Store();
  }
  return store;
}

export const StoreContext = createContext(initializeStore());
