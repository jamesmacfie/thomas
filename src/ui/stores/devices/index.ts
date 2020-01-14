import { createContext } from 'react';
import { observable, action } from 'mobx';
import fetch from 'isomorphic-unfetch';
import { store as deviceViewStore } from 'stores/deviceViews';
import logger from 'utils/logger';

const api_url = process.env.REACT_APP_API_URL;

export default class Store {
  device_key: string = 'thomas_device';
  @observable hasDeviceId: boolean = false;
  @observable device: Device | null = null;
  @observable otherDevices: Device[] | null = null;

  constructor() {
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
    const device = await fetch(`${api_url}/api/device/${deviceId}`).then(res => res.json());
    logger.debug('Setting device', { device });
    this.device = device;
    await deviceViewStore.fetchAll({ deviceId });
  };

  @action
  insert = async (values: { name: string; icon: string }) => {
    logger.debug('Devices store insert', { values });
    const device: Device = await fetch(`${api_url}/api/device`, {
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
    logger.debug('Devices store fetchAll');
    const devices = await fetch(`${api_url}/api/devices`).then(res => res.json());
    logger.debug('Setting other devives', { devices });
    this.otherDevices = devices;
  };

  @action
  updateConfigSetting = async (key: keyof DeviceConfig, value: any) => {
    logger.debug('Devices store updateConfigSetting', { key, value });

    if (!this.device) {
      logger.warn('No device set, cannot update setting');
      return;
    }

    // Would be nice not to have to recreate the object here just to have the nested config update
    this.device = {
      ...this.device,
      config: {
        ...this.device.config,
        [key]: value
      }
    };

    try {
      await fetch(`${api_url}/api/device/${this.device.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.device)
      });
    } catch (error) {
      logger.warn('Error updating setting', { key, value, error });
    }
  };

  comitPendingUpdate = async () => {
    logger.debug('DeviceViews store comitPendingUpdate');
    const deviceId = this.getDeviceId();
    if (!deviceId) {
      logger.warn('No deviceId set, cannot commit update');
      return;
    }

    await fetch(`${api_url}/api/device/${deviceId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.device)
    });
  };
}

export let store = new Store();

export const StoreContext = createContext(store);
