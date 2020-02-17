import { createContext } from 'react';
import { observable, action } from 'mobx';

export default class Store {
  themeKey: string = 'thomas_theme';
  @observable drawerOpen: boolean = false;
  @observable editMode: boolean = false;
  @observable minimalEditMode: boolean = true;
  @observable theme: string = localStorage.getItem(this.themeKey) || 'dark';

  @action
  openDrawer = () => (this.drawerOpen = true);
  @action
  closeDrawer = () => (this.drawerOpen = false);
  @action
  toggleDrawer = () => (this.drawerOpen = !this.drawerOpen);

  @action
  toggleMinimalEditMode = () => (this.minimalEditMode = !this.minimalEditMode);

  @action
  startEditMode = () => (this.editMode = true);
  @action
  stopEditMode = () => (this.editMode = false);
  @action
  toggleEditMode = () => (this.editMode = !this.editMode);

  @action
  setTheme = (theme: string) => {
    this.theme = theme;
    localStorage.setItem(this.themeKey, theme);
  };
}

export let store = new Store();
export const StoreContext = createContext(store);
