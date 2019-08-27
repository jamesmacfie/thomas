import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from 'components/icon';
import UIStore, { StoreContext as UIStoreContext } from 'stores/ui';
import NewComponent from './newComponent';

const EditStoreController = observer(() => {
  const store = useContext(UIStoreContext) as UIStore;
  if (!store.editMode) {
    return null;
  }

  return (
    <div className="absolute bottom-0 right-0 m-6">
      <Icon
        icon="checkCircle"
        onClick={store.stopEditMode}
        className="w-8 h-8 cursor-pointer white current-stroke border-white mb-2"
      />
      <NewComponent />
    </div>
  );
});

export default EditStoreController;
