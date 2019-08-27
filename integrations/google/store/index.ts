import { createContext } from 'react';
import { observable } from 'mobx';
import { useStaticRendering } from 'mobx-react-lite';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

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
