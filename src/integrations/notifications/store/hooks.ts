import { useContext } from 'react';
import { useObserver } from 'mobx-react-lite';
import { StoreContext } from '../store';

export const useNotifications = () => {
  const store = useContext(StoreContext);
  return useObserver(() => {
    return store.notifications;
  });
};
