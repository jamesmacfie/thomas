import { createContext } from 'react';
import { observable, action } from 'mobx';
import fetch from 'isomorphic-unfetch';
import { store as deviceViewStore } from 'stores/deviceViews';
import logger from 'utils/logger';

const isServer = typeof window === 'undefined';

export default class Store {
  device_key: string = 'thomas_device';
  @observable hasDeviceId: boolean = false;
  @observable device: Device | null = null;
  @observable otherDevices: Device[] | null = null;

  constructor() {
    if (isServer) {
      logger.debug('Devices store - not loading, server rendered');
      return;
    }

    const currentDeviceId = this.getDeviceId();
    if (currentDeviceId) {
      logger.debug('Device Id  is currently set, fetching', { currentDeviceId });
      this.hasDeviceId = true;
      this.fetch();
    }
  }

  getDeviceId = () => {
    logger.debug('Devices store getDeviceId');
    return localStorage.getItem(this.device_key);
  };

  @action
  setDeviceId = async (id: number) => {
    logger.debug('Devices store setDeviceId', { id });
    localStorage.setItem(this.device_key, id.toString());
    this.hasDeviceId = true;
    await this.fetch();
  };

  @action
  fetch = async () => {
    const deviceId = this.getDeviceId();
    logger.debug('Devices store fetch', { deviceId });
    if (!deviceId) {
      logger.warn('No deviceId set, cannot fetch');
      return;
    }
    const device = await fetch(`http://localhost:3000/device/${deviceId}`).then(res => res.json());
    logger.debug('Setting device', { device });
    this.device = device;
    await deviceViewStore.fetchAll({ deviceId });
  };

  @action
  insert = async (values: { name: string; icon: string }) => {
    logger.debug('Devices store insert', { values });
    const device: Device = await fetch(`/device`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(res => res.json());
    logger.debug('Device inserted, setting device Id ', { device });
    this.setDeviceId(device.id);
    this.device = device;
  };

  @action
  fetchAll = async () => {
    logger.debug('Devices store fetch all');
    const devices = await fetch('http://localhost:3000/devices').then(res => res.json());
    logger.debug('Setting other devives', { devices });
    this.otherDevices = devices;
  };

  comitPendingUpdate = async () => {
    logger.debug('DeviceViews store comitPendingUpdate');
    const deviceId = this.getDeviceId();
    if (!deviceId) {
      logger.warn('No deviceId set, cannot commit update');
      return;
    }

    await fetch(`http://localhost:3000/device/${deviceId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.device)
    });
  };
}

export let store = new Store();

export const StoreContext = createContext(store);
