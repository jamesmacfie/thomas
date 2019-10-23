import { createContext } from 'react';
import { observable, action } from 'mobx';
import logger from 'utils/logger';

const isServer = typeof window === 'undefined';

console.log('here');
export default class Store {
  device_key: string = 'thomas_developer';
  @observable debugLogs: boolean = false;

  constructor() {
    if (isServer) {
      logger.debug('Developer store - not loading, server rendered');
      return;
    }

    this.initSettings();
  }

  @action
  initSettings = () => {
    const settings = this.getSettings();
    if (!settings) {
      logger.warn('No settings set. Saving as blank object');
      this.setAllSettings({});
      return;
    }

    this.debugLogs = !!settings.debugLogs;
    this.initDebugLogs();
    return Promise.resolve();
  };

  getSettings = () => {
    try {
      return JSON.parse(window.localStorage.getItem(this.device_key) || '');
    } catch (error) {
      logger.warn('Could not parse developer settings', { error });
    }
  };

  setSetting = (key: string, value: any) => {
    try {
      const settings = this.getSettings();
      settings[key] = value;
      this.setAllSettings(settings);
    } catch (error) {
      logger.warn('Could not save setting', { key, value, error });
    }
  };

  setAllSettings = (settings: any) => {
    try {
      window.localStorage.setItem(this.device_key, JSON.stringify(settings));
    } catch (error) {
      logger.warn('Could not store developer settings', { error });
    }
  };

  initDebugLogs = () => {
    console.log(!!this.debugLogs ? 'debug' : 'warn');
    logger.level(!!this.debugLogs ? 'debug' : 'warn');
  };

  @action
  enableDebugLogs = () => {
    console.log('Developer store enableDebugLogs');
    logger.level('debug');
    this.debugLogs = true;
    this.setSetting('debugLogs', true);
  };

  @action
  disableDebugLogs = () => {
    console.log('Developer store disableDebugLogs');
    logger.level('warn');
    this.debugLogs = false;
    this.setSetting('debugLogs', false);
  };

  toggleDebugLogs = () => {
    logger.debug('Developer store toggleDebugLogs', { current: this.debugLogs });
    this.debugLogs ? this.disableDebugLogs() : this.enableDebugLogs();
  };
}

export let store = new Store();

export const StoreContext = createContext(store);
