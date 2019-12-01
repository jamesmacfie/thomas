import { createContext } from 'react';
import { observable, action } from 'mobx';
import uuid from 'uuid/v4';
import { store as devicesStore } from 'stores/devices';
import logger from 'utils/logger';

const isServer = typeof window === 'undefined';

export default class Store {
  websocket: WebSocket | null = null;
  @observable notifications: ThomasNotification[] = [];

  constructor() {
    if (isServer) {
      logger.debug('Notification store - not loading, server rendered');
      return;
    }
    this.connectWebSocket();
  }

  connectWebSocket = () => {
    const deviceId = devicesStore.getDeviceId();
    if (!deviceId) {
      return window.setTimeout(() => {
        this.connectWebSocket();
      }, 2000);
    }

    // TODO - this needs to come from an env var https://nicedoc.io/tusbar/next-runtime-dotenv maybe
    const wsURL = `ws://localhost:3000/notifications/${deviceId}`;
    console.log('Notification store subscribing to websocket', { wsURL });
    try {
      this.websocket = new WebSocket(wsURL);
      this.websocket.onmessage = (e: MessageEvent) => {
        const data: ThomasNotificationInput = JSON.parse(e.data);
        this.add({
          color: data.color || 'info',
          icon: data.icon,
          imageSrc: data.imageSrc,
          title: data.title,
          text: data.text
        });
      };
    } catch (error) {
      logger.error('Error setting up notification websocket', { error });
    }
  };

  @action
  clearAll = () => {
    logger.debug('Notification store clearAll');
    this.notifications = [];
  };

  @action
  add = (notification: ThomasNotificationInput) => {
    logger.debug('Notification store add', { notification });
    this.notifications = [
      {
        id: uuid(),
        ...notification
      }
    ].concat(this.notifications);
  };

  @action
  clearById = (id: string) => {
    logger.debug('Notification store clearById', { id });
    this.notifications = this.notifications.filter(n => n.id !== id);
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
