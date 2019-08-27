import { createContext } from 'react';
import { observable } from 'mobx';
import fetch from 'isomorphic-unfetch';

export default class Store {
  @observable devices: any[] | null = null;

  getDevices = async () => {
    const devices = await fetch('http://localhost:3000/devices').then(res => res.json());
    this.devices = devices;
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
