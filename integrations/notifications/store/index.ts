import { createContext } from 'react';
import { observable, action } from 'mobx';
import uuid from 'uuid/v4';
import logger from 'utils/logger';

export default class Store {
  @observable notifications: ThomasNotification[] = [];

  @action
  clearAll = () => {
    logger.debug('Notification store clearAll');
    this.notifications = [];
  };

  @action
  add = (notification: ThomasNotificationInput) => {
    logger.debug('Notification store add', { notification });
    this.notifications = this.notifications.concat({
      id: uuid(),
      ...notification
    });
  };

  @action
  clearById = (id: string) => {
    logger.debug('Notification store clearById', { id });
    this.notifications = this.notifications.filter(n => n.id !== id);
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
