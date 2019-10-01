import { createContext } from 'react';
import { keyBy, isEqual } from 'lodash';
import { observable } from 'mobx';
import fetch from 'isomorphic-unfetch';
import { store as devicesStore } from 'stores/devices';

interface ViewWidgetCreate {
  integrationId: number;
  integrationSlug: string;
  widgetSlug: string;
  viewId: number;
  config: WidgetConfig;
}

interface ViewWidgetUpdate {
  widgetId: number;
  config: WidgetConfig;
}

export default class Store {
  @observable views: { [key: string]: View } = {}; // TODO - should have a proper type

  getViews = async () => {
    const views = await fetch(`http://localhost:3000/views`).then(res => res.json());
    this.views = keyBy(views, 'id');
  };

  addWidget = (viewId: number, widget: any) => {
    if (!viewId) {
      console.log('No viewId provided to add widget to');
      return;
    }
    if (!this.views || !this.views[viewId]) {
      console.log(`No view for id ${viewId}`);
      return;
    }
    this.views[viewId].widgets = this.views[viewId].widgets.concat(widget);
  };

  createViewWidget = async (values: ViewWidgetCreate) => {
    const widget = await fetch(`/widget`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        deviceId: devicesStore.getDeviceId(),
        ...values
      })
    }).then(res => res.json());

    this.addWidget(values.viewId, widget);
  };

  updateViewWidgets = async (viewId: number, updates: ViewWidgetUpdate[]) => {
    const updatedWidgets = await Promise.all(
      this.views[viewId].widgets.map(async (cmp: any) => {
        const update = updates.find(u => u.widgetId === cmp.id);
        if (!update || isEqual(cmp.config, update.config)) {
          return Promise.resolve(cmp);
        }

        await fetch(`http://localhost:3000/widget/${update.widgetId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            config: {
              ...cmp.config,
              ...update.config
            }
          })
        });

        return {
          ...cmp,
          config: {
            ...cmp.config,
            ...update.config
          }
        };
      })
    );

    this.views[viewId].widgets = updatedWidgets;
  };
}

export const store = new Store();
export const StoreContext = createContext(store);
