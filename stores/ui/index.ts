import { createContext } from 'react';
import { observable, action } from 'mobx';

export default class Store {
  @observable drawerOpen: boolean = false;
  @observable editMode: boolean = false;

  @action
  openDrawer = () => (this.drawerOpen = true);
  @action
  closeDrawer = () => (this.drawerOpen = false);
  @action
  toggleDrawer = () => (this.drawerOpen = !this.drawerOpen);

  @action
  startEditMode = () => (this.editMode = true);
  @action
  stopEditMode = () => (this.editMode = false);
  @action
  toggleEditMode = () => (this.editMode = !this.editMode);
}

export let store = new Store();
export const StoreContext = createContext(store);
