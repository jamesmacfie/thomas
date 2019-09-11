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
    await Promise.all(
      updates.map(async u => {
        const old = this.views[viewId].components.find((c: any) => c.id === u.componentId);
        if (!old || isEqual(old.config, u.config)) {
          return Promise.resolve();
        }
        await fetch(`http://localhost:3000/component/${u.componentId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ config: u.config })
        });

        // TODO - need to update the cached UI components inside this.views here
      })
    );
  };
}

export const store = new Store();
export const StoreContext = createContext(store);
