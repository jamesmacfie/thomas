import { createContext } from 'react';
import { observable } from 'mobx';

export default class Store {
  @observable integrations: Integration[] | null = null;
  @observable count: number = 0;

  constructor() {
    setInterval(() => {
      this.increment();
    }, 1000);
  }

  getIntegrations = async () => {
    const integrations = await fetch(`http://localhost:3000/integrations/google`).then(res => res.json());
    this.integrations = integrations;
  };

  increment = () => {
    this.count += 1;
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
