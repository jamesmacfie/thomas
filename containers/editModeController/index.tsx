import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from 'components/icon';
import { StoreContext as UIStoreContext } from 'stores/ui';
import { StoreContext as DeviceStoreContext } from 'stores/device';
import NewComponent from './newComponent';

const EditStoreController = observer(() => {
  const uiStore = useContext(UIStoreContext);
  const deviceStore = useContext(DeviceStoreContext);
  if (!uiStore.editMode) {
    return null;
  }

  const onColumnChange = (event: any) => {
    deviceStore.device!.config = {
      ...deviceStore.device!.config,
      columns: parseInt(event.target.value)
    };
  };

  const onRowHeightChange = (event: any) => {
    deviceStore.device!.config = {
      ...deviceStore.device!.config,
      rowHeight: parseInt(event.target.value)
    };
  };

  const onZoomChange = (event: any) => {
    deviceStore.device!.config = {
      ...deviceStore.device!.config,
      zoom: parseInt(event.target.value)
    };
  };

  const config = deviceStore.device!.config;

  return (
    <div className="absolute bottom-0 right-0 m-6">
      <div className="flex">
        <Icon
          icon="checkCircle"
          onClick={uiStore.stopEditMode}
          className="w-8 h-8 cursor-pointer white current-stroke border-white mb-2"
        />
        <NewComponent />
        <input type="range" min="10" max="30" onChange={onColumnChange} value={config.columns} />
        <input type="range" min="10" max="100" onChange={onRowHeightChange} value={config.rowHeight} />
        <input type="range" min="1" max="10" onChange={onZoomChange} value={config.zoom} />
      </div>
    </div>
  );
});

export default EditStoreController;
