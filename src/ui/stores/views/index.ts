import { createContext } from 'react';
import { keyBy, isEqual } from 'lodash';
import { observable, action } from 'mobx';
import fetch from 'isomorphic-unfetch';
import { store as devicesStore } from 'stores/devices';
import logger from 'utils/logger';

const api_url = process.env.REACT_APP_API_URL;

interface ViewWidgetCreate {
  integrationId: number | null;
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
    const views = await fetch(`${api_url}/api/views`).then(res => res.json());
    logger.debug('Setting views', { views });
    this.views = keyBy(views, 'id');
  };

  @action
  insertWidget = async (values: ViewWidgetCreate) => {
    logger.debug('Views store insertWidget', { values });
    const widget = await fetch(`${api_url}/api/widget`, {
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

  @action
  updateWidget = async (viewId: number, update: ViewWidgetUpdate) => {
    logger.debug('Views store insertWidget', { viewId, update });
    const currentWidget = this.views[viewId].widgets.find(w => w.id === update.widgetId);
    if (!currentWidget) {
      throw new Error(`Widget with id ${update.widgetId} does not exist in view store`);
    }

    const newConfig = {
      ...currentWidget.config,
      ...update.config
    };

    await fetch(`${api_url}/widget/${update.widgetId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        config: newConfig
      })
    });

    logger.debug('Updated widget', { viewId, update });
    const updatedWidgets = this.views[viewId].widgets.map(w => {
      if (w.id !== update.widgetId) {
        return w;
      }
      return {
        ...w,
        config: newConfig
      };
    });
    this.views[viewId].widgets = updatedWidgets;
  };

  @action
  updateWidgets = async (viewId: number, updates: ViewWidgetUpdate[]) => {
    logger.debug('Views store updateWidgets', { viewId, updates });
    const updatedWidgets = await Promise.all(
      this.views[viewId].widgets.map(async (widget: any) => {
        const update = updates.find(u => u.widgetId === widget.id);
        if (!update || isEqual(widget.config, update.config)) {
          logger.debug('No update needed', { update, widget });
          return Promise.resolve(widget);
        }

        await fetch(`${api_url}/api/widget/${update.widgetId}`, {
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

  deleteWidget = async (viewId: number, widgetId: number) => {
    logger.debug('Views store archiveWidget', { widgetId });
    await fetch(`${api_url}/api/view/${viewId}/widget/${widgetId}`, {
      method: 'DELETE'
    });

    logger.debug('Removing widget', { widgetId });
    this.views[viewId].widgets = this.views[viewId].widgets.filter(w => w.id !== widgetId);
  };
}

export const store = new Store();
export const StoreContext = createContext(store);
