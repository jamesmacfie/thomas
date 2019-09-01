import { createContext } from 'react';
import { observable } from 'mobx';
import fetch from 'isomorphic-unfetch';
import { store as deviceViewStore } from 'stores/deviceViews';

const isServer = typeof window === 'undefined';

export default class Store {
  device_key: string = 'thomas_device';
  @observable hasDeviceId: boolean = false;
  @observable device: any | null = null;

  constructor() {
    if (isServer) {
      return;
    }

    const currentDeviceId = this.getDeviceId();
    if (currentDeviceId) {
      this.hasDeviceId = true;
      this.getDevice();
    }
  }

  getDeviceId = () => {
    return localStorage.getItem(this.device_key);
  };

  setDeviceId = async (id: string) => {
    localStorage.setItem(this.device_key, id);
    this.hasDeviceId = true;
    await this.getDevice();
  };

  getDevice = async () => {
    const deviceId = this.getDeviceId();
    if (!deviceId) {
      console.warn('cannot get device details, no deviceId set');
      return;
    }
    const device = await fetch(`http://localhost:3000/device/${deviceId}`).then(res => res.json());
    this.device = device;
    if (deviceViewStore) {
      await deviceViewStore.getDeviceViews({ deviceId });
    }
  };
}

export let store = new Store();

export const StoreContext = createContext(store);
