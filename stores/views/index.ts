import { createContext } from 'react';
import { keyBy } from 'lodash';
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

  addComponent = (viewId: number | null, component: any) => {
    if (!viewId) {
      console.log('No viewId provided to add component to');
      return;
    }
    if (!this.views || this.views[viewId]) {
      console.log(`No view for id ${viewId}`);
      return;
    }
    this.views[viewId].components = this.views[viewId].components.concat(component);
  };

  updateViewComponents = async (_viewId: number, _updates: ViewComponentUpdate[]) => {
    // if (!this.viewComponents || !Object.keys(this.viewComponents).length) {
    //   return null;
    // }
    // // TODO try/catch
    // await Promise.all(
    //   updates.map(u => {
    //     const old = this.viewComponents[viewId].find((c: any) => c.id === u.componentId);
    //     if (!old || isEqual(old.config, u.config)) {
    //       return Promise.resolve();
    //     }
    //     fetch(`http://localhost:3000/component/${u.componentId}`, {
    //       method: 'PATCH',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ config: u.config })
    //     });
    //   })
    // );
    // TODO - should we update this.viewComponents here? Prob only if/when I bring in caching
    // into each page's requests
  };
}

export const store = new Store();
export const StoreContext = createContext(store);
