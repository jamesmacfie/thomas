import { createContext } from 'react';
import { observable, action } from 'mobx';
import uuid from 'uuid/v4';
import { store as devicesStore } from 'stores/devices';
import logger from 'utils/logger';

const api_url = process.env.REACT_APP_API_URL!;

export default class Store {
  websocket: WebSocket | null = null;
  @observable notifications: ThomasNotification[] = [];

  constructor() {
    this.connectWebSocket();
  }

  connectWebSocket = () => {
    const deviceId = devicesStore.getDeviceId();
    if (!deviceId) {
      return window.setTimeout(() => {
        this.connectWebSocket();
      }, 2000);
    }

    const wsURL = `${api_url.replace('http', 'ws')}/api/notifications/${deviceId}`;
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
    const id = uuid();
    this.notifications = [
      {
        id,
        ...notification
      }
    ].concat(this.notifications);

    return id;
  };

  @action
  clearById = (id: string) => {
    logger.debug('Notification store clearById', { id });
    this.notifications = this.notifications.filter(n => n.id !== id);
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
