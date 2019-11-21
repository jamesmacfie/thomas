import { createContext } from 'react';
import { observable, action } from 'mobx';
import { keyBy } from 'lodash';
import fetch from 'isomorphic-unfetch';
import { store as devicesStore } from 'stores/devices';
import logger from 'utils/logger';

interface DeviceViewWidgetUpdate {
  deviceViewId: number;
  order: number;
}

export default class Store {
  @observable loaded: boolean = false;
  @observable deviceViews: { [key: string]: DeviceView } = {};
  pendingDeviceViewUpdates: { [key: string]: DeviceView } = {};

  @action
  fetchAll = async ({ deviceId }: { deviceId: number | string }) => {
    logger.debug('DeviceViews store fetchAll', { deviceId });
    const deviceViews = await fetch(`${process.env.API_URL}/device/${deviceId}/views`).then(res => res.json());
    logger.debug('Setting deviceViews', { deviceViews });
    this.deviceViews = keyBy(deviceViews, 'id');
    this.loaded = true;
  };

  @action
  insert = async (values: { viewId?: number; name: string; icon: string }) => {
    logger.debug('DeviceViews store insert', { values });
    const deviceView = await fetch(`/device/${devicesStore.getDeviceId()}/view`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        ...values,
        createNewView: false
      })
    }).then(res => res.json());
    logger.debug('Saved deviceView', { deviceView });
    this.deviceViews[deviceView.id] = deviceView;
    return deviceView;
  };

  @action
  update = async (values: { viewId: number; name: string; icon: string }) => {
    logger.debug('DeviceViews store update', { values });
    const deviceView = await fetch(`/device/view/${values.viewId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        ...values
      })
    }).then(res => res.json());
    logger.debug('Saved deviceView', { deviceView });
    this.deviceViews[deviceView.id] = {
      ...deviceView,
      name: values.name,
      icon: values.icon
    };
    return deviceView;
  };

  @action
  updateAll = async (updates: DeviceViewWidgetUpdate[]) => {
    logger.debug('DeviceViews store updateAll', { updates });
    if (!Object.values(this.deviceViews).length) {
      logger.warn('No device views, not updating', { deviceViews: this.deviceViews });
      return Promise.resolve();
    }

    try {
      await Promise.all(
        updates.map(u => {
          const old = this.deviceViews![u.deviceViewId];
          if (!old || old.order == u.order) {
            logger.debug('No update needed', { old, update: u });
            // Either we don't have this device view (shouldnt happen?) or the order is the same.
            // In both cases, do nothing.
            return Promise.resolve();
          }

          logger.debug('Updating', { update: u });
          fetch(`${process.env.API_URL}/device/view/${u.deviceViewId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order: u.order })
          });

          const valuesToUpdate = {
            ...this.deviceViews[u.deviceViewId],
            order: u.order
          };
          logger.debug('Pending local commit', { valuesToUpdate });
          this.pendingDeviceViewUpdates[u.deviceViewId] = valuesToUpdate;
        })
      );
    } catch (error) {
      logger.error('Error updating device views', { error });
      throw error;
    }
  };

  @action
  commitPendingUpdates = () => {
    logger.debug('DeviceViews store commitPendingUpdates');
    Object.keys(this.pendingDeviceViewUpdates).forEach(id => {
      const existing = this.deviceViews[id];
      if (!existing) {
        logger.warn('No view for pending update', { id });
        return;
      }

      this.deviceViews[id] = {
        ...existing,
        ...this.pendingDeviceViewUpdates[id]
      };
    });

    logger.debug('All pending updates successful');
    this.pendingDeviceViewUpdates = {};
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
