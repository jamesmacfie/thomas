import { useContext } from 'react';
import { useObserver } from 'mobx-react-lite';
import { StoreContext } from '.';

export const useEditMode = () => {
  const store = useContext(StoreContext);

  return useObserver(() => {
    return store.editMode;
  });
};
