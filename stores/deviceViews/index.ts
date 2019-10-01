import { createContext } from 'react';
import { observable } from 'mobx';
import { keyBy } from 'lodash';
import fetch from 'isomorphic-unfetch';
import { store as devicesStore } from 'stores/devices';

interface DeviceViewWidgetUpdate {
  deviceViewId: number;
  order: number;
}

export default class Store {
  @observable loaded: boolean = false;
  @observable deviceViews: { [key: string]: DeviceView } = {};
  pendingDeviceViewUpdates: { [key: string]: DeviceView } = {};

  getDeviceViews = async ({ deviceId }: { deviceId: number | string }) => {
    const deviceViews = await fetch(`http://localhost:3000/device/${deviceId}/views`).then(res => res.json());
    this.deviceViews = keyBy(deviceViews, 'id');
    this.loaded = true;
  };

  createDeviceView = async (values: { name: string; icon: string }) => {
    const deviceView = await fetch(`/device/${devicesStore.getDeviceId()}/view`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        ...values,
        createNewView: true
      })
    }).then(res => res.json());
    this.deviceViews[deviceView.id] = deviceView;
    return deviceView;
  };

  createDeviceViewFromExisting = async (values: { viewId: number; name: string; icon: string }) => {
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
    this.deviceViews[deviceView.id] = deviceView;
    return deviceView;
  };

  updateDeviceViews = async (updates: DeviceViewWidgetUpdate[]) => {
    if (!Object.values(this.deviceViews).length) {
      return Promise.resolve();
    }

    try {
      await Promise.all(
        updates.map(u => {
          const old = this.deviceViews![u.deviceViewId];
          if (!old || old.order == u.order) {
            // Either we don't have this device view (shouldnt happen?) or the order is the same.
            // In both cases, do nothing.
            return Promise.resolve();
          }

          fetch(`http://localhost:3000/device/view/${u.deviceViewId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order: u.order })
          });

          this.pendingDeviceViewUpdates[u.deviceViewId] = {
            ...this.deviceViews[u.deviceViewId],
            order: u.order
          };
        })
      );
    } catch (err) {
      console.error('Error updating devies views');
      throw err;
    }
  };

  commitPendingDeviceViewUpdates = () => {
    Object.keys(this.pendingDeviceViewUpdates).forEach(id => {
      const existing = this.deviceViews[id];
      if (!existing) {
        return;
      }

      this.deviceViews[id] = {
        ...existing,
        ...this.pendingDeviceViewUpdates[id]
      };
    });

    this.pendingDeviceViewUpdates = {};
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
