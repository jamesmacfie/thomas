import { useContext } from 'react';
import { useObserver } from 'mobx-react-lite';
import { StoreContext } from '.';

export const useViewWidgets = (viewId: number) => {
  const store = useContext(StoreContext);

  return useObserver(() => {
    return store.views[viewId].widgets;
  });
};

export const useView = (viewId: number) => {
  const store = useContext(StoreContext);

  return useObserver(() => {
    return store.views[viewId];
  });
};

export const useViews = () => {
  const store = useContext(StoreContext);

  return useObserver(() => {
    return store.views;
  });
};
