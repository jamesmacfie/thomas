import { useContext } from 'react';
import { useObserver } from 'mobx-react-lite';
import { StoreContext } from '.';

export const useDeviceView = (viewId: number) => {
  const store = useContext(StoreContext);

  return useObserver(() => {
    return store.deviceViews[viewId];
  });
};
