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
      deviceStore.comitPendingUpdate();
    }
  }, [UIStore.editMode, deviceStore.device]);

  if (!UIStore.editMode) {
    return null;
  }

  const onNumericValueChange = ({ target }: any) => {
    deviceStore.updateConfigSetting(target.name, parseInt(target.value));
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
        <input
          name="columns"
          className="w-full"
          type="range"
          min="10"
          max="30"
          onChange={onNumericValueChange}
          value={config.columns}
        />
        <Label color="alt">Row size</Label>
        <input
          name="rowHeight"
          className="w-full"
          type="range"
          min="10"
          max="100"
          onChange={onNumericValueChange}
          value={config.rowHeight}
        />
        <Label color="alt">Zoom level</Label>
        <input
          name="zoom"
          className="w-full"
          type="range"
          min="1"
          max="10"
          onChange={onNumericValueChange}
          value={config.zoom}
        />
      </div>
      <Button className="w-full mt-4" color="secondary-alt" onClick={UIStore.stopEditMode}>
        Finish
      </Button>
    </div>
  );
});

export default EditStoreController;
