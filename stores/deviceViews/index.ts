import { createContext } from 'react';
import { observable } from 'mobx';
import { keyBy } from 'lodash';
import fetch from 'isomorphic-unfetch';

interface DeviceViewComponentUpdate {
  deviceViewId: number;
  order: number;
}

export default class Store {
  @observable loaded: boolean = false;
  @observable deviceViews: { [key: string]: DeviceView } = {};

  getDeviceViews = async ({ deviceId }: { deviceId: string }) => {
    const deviceViews = await fetch(`http://localhost:3000/device/${deviceId}/views`).then(res => res.json());
    this.deviceViews = keyBy(deviceViews, 'id');
    this.loaded = true;
  };

  addDeviceView = (deviceView: DeviceView) => {
    this.deviceViews[deviceView.id] = deviceView;
  };

  updateDeviceViews = async (updates: DeviceViewComponentUpdate[]) => {
    if (!Object.values(this.deviceViews).length) {
      return Promise.resolve();
    }

    try {
      await Promise.all(
        updates.map(u => {
          const old = this.deviceViews![u.deviceViewId];
          if (!old || old.order === u.order) {
            // Either we don't have this device view (shouldnt happen?) or the order is the same.
            // In both cases, do nothing.
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
