import { createContext } from 'react';
import { observable, action } from 'mobx';
import fetch from 'isomorphic-unfetch';
import { store as deviceViewStore } from 'stores/deviceViews';

const isServer = typeof window === 'undefined';

export default class Store {
  device_key: string = 'thomas_device';
  @observable hasDeviceId: boolean = false;
  @observable device: Device | null = null;
  @observable otherDevices: Device[] | null = null;

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

  commitConfig = async () => {
    const deviceId = this.getDeviceId();
    if (!deviceId) {
      console.warn('cannot get device details, no deviceId set');
      return;
    }

    await fetch(`http://localhost:3000/device/${deviceId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.device)
    });
  };

  getDeviceId = () => {
    return localStorage.getItem(this.device_key);
  };

  @action
  setDeviceId = async (id: number) => {
    localStorage.setItem(this.device_key, id.toString());
    this.hasDeviceId = true;
    await this.getDevice();
  };

  @action
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

  @action
  addDevice = async (values: { name: string; icon: string }) => {
    const device: Device = await fetch(`/device`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(res => res.json());
    this.setDeviceId(device.id);
    this.device = device;
  };

  @action
  getOtherDevices = async () => {
    const devices = await fetch('http://localhost:3000/devices').then(res => res.json());
    this.otherDevices = devices;
  };
}

export let store = new Store();

export const StoreContext = createContext(store);
