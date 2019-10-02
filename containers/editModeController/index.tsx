import React, { useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Label from 'components/label';
import Button from 'components/button';
import { StoreContext as UIStoreContext } from 'stores/ui';
import { StoreContext as DevicesStoreContext } from 'stores/devices';
import AddNewWidgetModal from 'containers/addNewWidgetModal';
import logger from 'utils/logger';

const EditStoreController = observer(() => {
  const UIStore = useContext(UIStoreContext);
  const deviceStore = useContext(DevicesStoreContext);
  const [addNewModalVisible, setAddNewModalVisble] = useState<boolean>(false);
  const toggleAddNewModalVisible = () => {
    logger.debug('toggleAddNewModalVisible from', { addNewModalVisible });
    setAddNewModalVisble(!addNewModalVisible);
  };
  useEffect(() => {
    // Commit the config changes after updating
    if (!UIStore.editMode && deviceStore) {
      logger.debug('Commiting edited device config');
      deviceStore.commitConfig();
    }
  }, [UIStore.editMode, deviceStore.device]);

  if (!UIStore.editMode) {
    return null;
  }

  // TODO - move these into the correct store
  const onColumnChange = (event: any) => {
    const columns = parseInt(event.target.value);
    logger.debug('Column change in <EditModeController />', { columns });
    deviceStore.device!.config = {
      ...deviceStore.device!.config,
      columns
    };
  };

  const onRowHeightChange = (event: any) => {
    const rowHeight = parseInt(event.target.value);
    logger.debug('Row height change in <EditModeController />', { rowHeight });
    deviceStore.device!.config = {
      ...deviceStore.device!.config,
      rowHeight
    };
  };

  const onZoomChange = (event: any) => {
    const zoom = parseInt(event.target.value);
    logger.debug('Zoom change in <EditModeController />', { zoom });
    deviceStore.device!.config = {
      ...deviceStore.device!.config,
      zoom
    };
  };

  const config = deviceStore.device!.config;

  return (
    <div className="absolute bottom-0 right-0 m-6 bg-grey-lighter p-4 2-48 rounded">
      <Button color="secondary-alt" className="w-full mb-4" onClick={toggleAddNewModalVisible}>
        Add new widget
      </Button>
      {addNewModalVisible && <AddNewWidgetModal onClose={toggleAddNewModalVisible} />}
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
      <Button className="w-full mt-4" color="secondary-alt" onClick={UIStore.stopEditMode}>
        Finish
      </Button>
    </div>
  );
});

export default EditStoreController;
