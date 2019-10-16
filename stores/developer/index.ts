import { createContext } from 'react';
import { observable, action } from 'mobx';
import logger from 'utils/logger';

const isServer = typeof window === 'undefined';

export default class Store {
  device_key: string = 'thomas_developer';
  @observable debugLogs: boolean = false;

  constructor() {
    if (isServer) {
      logger.debug('Develoepr store - not loading, server rendered');
      return;
    }

    this.initSettings();
  }

  @action
  initSettings = () => {
    const settings = this.getSettings();
    if (!settings) {
      return;
    }

    this.debugLogs = !!settings.debugLogs;
  };

  getSettings = () => {
    try {
      return JSON.parse(window.localStorage.get(this.device_key));
    } catch (error) {
      logger.warn('Could not parse developer settings', { error });
    }
  };

  setSettings = (settings: any) => {
    try {
      window.localStorage.setItem(this.device_key, JSON.stringify(settings));
    } catch (error) {
      logger.warn('Could not store developer settings', { error });
    }
  };

  @action
  enableDebugLogs = () => {
    logger.debug('Developer store enableDebugLogs');
    logger.level('debug');
    this.debugLogs = true;
  };

  @action
  disableDebugLogs = () => {
    logger.debug('Developer store disableDebugLogs');
    logger.level('error');
    this.debugLogs = false;
  };

  toggleDebugLogs = () => {
    logger.debug('Developer store toggleDebugLogs', { current: this.debugLogs });
    this.debugLogs ? this.disableDebugLogs() : this.enableDebugLogs();
  };
}

export let store = new Store();

export const StoreContext = createContext(store);
