import { createContext } from 'react';
import { observable } from 'mobx';
import { keyBy } from 'lodash';
import fetch from 'isomorphic-unfetch';

interface DeviceViewComponentUpdate {
  deviceViewId: number;
  order: number;
}

export default class Store {
  @observable deviceViews: { [key: string]: DeviceView } | null = null;

  getDeviceViews = async ({ deviceId }: { deviceId: string }) => {
    const deviceViews = await fetch(`http://localhost:3000/device/${deviceId}/views`).then(res => res.json());
    this.deviceViews = keyBy(deviceViews, 'id');
  };

  updateDeviceViews = async (updates: DeviceViewComponentUpdate[]) => {
    if (!this.deviceViews) {
      return Promise.resolve();
    }

    try {
      await Promise.all(
        updates.map(u => {
          const old = this.deviceViews![u.deviceViewId];
          if (!old || old.order === u.order) {
            // Either we don't have this device view (shouldnt happen?) or the order is the same.
            // In both cases, do nothing.
            console.log('Order the same for ', u.deviceViewId);
            return Promise.resolve();
          }

          fetch(`http://localhost:3000/device/view/${u.deviceViewId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order: u.order })
          });
        })
      );
    } catch (err) {
      console.error('Error updating devies views');
      throw err;
    }

    updates.forEach(u => {
      this.deviceViews![u.deviceViewId].order = u.order;
    });
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
