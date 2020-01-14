import { useContext } from 'react';
import { useObserver } from 'mobx-react-lite';
import { StoreContext } from '.';

export const useDevice = () => {
  const store = useContext(StoreContext);

  return useObserver(() => {
    return store.device;
  });
};

export const useOtherDevices = () => {
  const store = useContext(StoreContext);

  return useObserver(() => {
    return store.otherDevices;
  });
};
