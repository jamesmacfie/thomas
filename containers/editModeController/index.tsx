import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Label from 'components/label';
import Button from 'components/button';
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
    <div className="absolute bottom-0 right-0 m-6 bg-grey-lighter p-4 2-48 rounded">
      <NewComponent />
      <div>
        <Label color="alt">Column count</Label>
        <input className="w-full" type="range" min="10" max="30" onChange={onColumnChange} value={config.columns} />
        <Label color="alt">Row size</Label>
        <input
          className="w-full"
          type="range"
          min="10"
          max="100"
          onChange={onRowHeightChange}
          value={config.rowHeight}
        />
        <Label color="alt">Zoom level</Label>
        <input className="w-full" type="range" min="1" max="10" onChange={onZoomChange} value={config.zoom} />
      </div>
      <Button className="w-full mt-4" color="secondary-alt" onClick={uiStore.stopEditMode}>
        Finish
      </Button>
    </div>
  );
});

export default EditStoreController;
