import { createContext } from 'react';
import { keyBy, isEqual } from 'lodash';
import { observable, action } from 'mobx';
import fetch from 'isomorphic-unfetch';
import { store as devicesStore } from 'stores/devices';
import logger from 'utils/logger';

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

  @action
  fetchAll = async () => {
    logger.debug('Views store fetchAll');
    const views = await fetch(`http://localhost:3000/views`).then(res => res.json());
    logger.debug('Setting views', { views });
    this.views = keyBy(views, 'id');
  };

  insertWidget = async (values: ViewWidgetCreate) => {
    logger.debug('Views store insertWidget', { values });
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

    logger.debug('Setting widget', { widget, viewId: values.viewId });
    this.views[values.viewId].widgets = this.views[values.viewId].widgets.concat(widget);
  };

  updateWidgets = async (viewId: number, updates: ViewWidgetUpdate[]) => {
    logger.debug('Views store insertWidget', { viewId, updates });
    const updatedWidgets = await Promise.all(
      this.views[viewId].widgets.map(async (widget: any) => {
        const update = updates.find(u => u.widgetId === widget.id);
        if (!update || isEqual(widget.config, update.config)) {
          logger.debug('No update needed', { update, widget });
          return Promise.resolve(widget);
        }

        await fetch(`http://localhost:3000/widget/${update.widgetId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            config: {
              ...widget.config,
              ...update.config
            }
          })
        });

        return {
          ...widget,
          config: {
            ...widget.config,
            ...update.config
          }
        };
      })
    );

    logger.debug('Updated widgets', { viewId, updatedWidgets });
    this.views[viewId].widgets = updatedWidgets;
  };
}

export const store = new Store();
export const StoreContext = createContext(store);
