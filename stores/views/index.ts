import { createContext } from 'react';
import { keyBy, isEqual } from 'lodash';
import { observable } from 'mobx';
import fetch from 'isomorphic-unfetch';

interface ViewComponentUpdate {
  componentId: number;
  config: ComponentConfig;
}

export default class Store {
  @observable views: any = {}; // TODO - should have a proper type

  getViews = async () => {
    const views = await fetch(`http://localhost:3000/views`).then(res => res.json());
    this.views = keyBy(views, 'id');
  };

  addComponent = (viewId: string, component: any) => {
    if (!viewId) {
      console.log('No viewId provided to add component to');
      return;
    }
    if (!this.views || !this.views[viewId]) {
      console.log(`No view for id ${viewId}`);
      return;
    }
    this.views[viewId].components = this.views[viewId].components.concat(component);
  };

  updateViewComponents = async (viewId: number, updates: ViewComponentUpdate[]) => {
    const updatedComponents = await Promise.all(
      this.views[viewId].components.map(async (cmp: any) => {
        const update = updates.find(u => u.componentId === cmp.id);
        if (!update || isEqual(cmp.config, update.config)) {
          return Promise.resolve(cmp);
        }

        await fetch(`http://localhost:3000/component/${update.componentId}`, {
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

    this.views[viewId].components = updatedComponents;
  };
}

export const store = new Store();
export const StoreContext = createContext(store);
