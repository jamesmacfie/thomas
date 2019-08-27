import { createContext } from 'react';
import { observable } from 'mobx';

export default class Store {
  @observable drawerOpen: boolean = false;
  @observable editMode: boolean = false;

  openDrawer = () => (this.drawerOpen = true);
  closeDrawer = () => (this.drawerOpen = false);
  toggleDrawer = () => (this.drawerOpen = !this.drawerOpen);

  startEditMode = () => (this.editMode = true);
  stopEditMode = () => (this.editMode = false);
  toggleEditMode = () => (this.editMode = !this.editMode);
}

export let store = new Store();
export const StoreContext = createContext(store);
