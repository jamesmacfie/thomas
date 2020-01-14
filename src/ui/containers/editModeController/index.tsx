import React, { useState, useContext, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { observer } from 'mobx-react-lite';
import { StoreContext as UIStoreContext } from 'stores/ui';
import { StoreContext as DevicesStoreContext } from 'stores/devices';
import AddNewWidgetModal from 'containers/addNewWidgetModal';
import Label from 'components/label';
import Button from 'components/button';
import SelectPill from 'components/selectPill';
import logger from 'utils/logger';

const navPlacementOptions = [
  {
    value: 'left',
    text: 'Left'
  },
  {
    value: 'bottom',
    text: 'Bottom'
  },
  {
    value: 'right',
    text: 'Right'
  }
];

const EditModeController = observer(() => {
  const UIStore = useContext(UIStoreContext);
  const deviceStore = useContext(DevicesStoreContext);
  const [addNewModalVisible, setAddNewModalVisble] = useState<boolean>(false);
  const toggleAddNewModalVisible = () => {
    logger.debug('toggleAddNewModalVisible from', { addNewModalVisible });
    setAddNewModalVisble(!addNewModalVisible);
  };
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    // Commit the config changes after updating
    if (!UIStore.editMode) {
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
  const onCheckboxValueChange = ({ target }: any) => {
    deviceStore.updateConfigSetting(target.name, target.checked);
  };
  const onPillValueChange = (name: any, value: string) => {
    deviceStore.updateConfigSetting(name, value);
  };

  const config = deviceStore.device!.config;

  return (
    <Draggable bounds="parent">
      <div className="cursor-move w-64 z-40" style={{ position: 'absolute', bottom: '100px', right: '100px' }}>
        <div className="w-full m-6 bg-grey-lighter p-4 2-48 rounded">
          {!UIStore.minimalEditMode && (
            <>
              <div>
                <SelectPill
                  value={config.sideNavPlacement}
                  alt
                  name="sideNavPlacement"
                  pills={navPlacementOptions}
                  onSelect={onPillValueChange}
                />
                <div className="flex w-full">
                  <Label className="flex-grow" color="alt">
                    Show header
                  </Label>
                  <input
                    name="showHeader"
                    className="self-align"
                    type="checkbox"
                    onChange={onCheckboxValueChange}
                    checked={config.showHeader}
                  />
                </div>
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
            </>
          )}
          <span className="text-blue cursor-pointer" onClick={UIStore.toggleMinimalEditMode}>
            {UIStore.minimalEditMode ? 'Expand' : 'Minimize'}
          </span>
          <Button color="secondary-alt" className="w-full mt-4" onClick={toggleAddNewModalVisible}>
            Add new widget
          </Button>
          {addNewModalVisible && <AddNewWidgetModal onClose={toggleAddNewModalVisible} />}
          <Button className="w-full mt-4" color="secondary-alt" onClick={UIStore.stopEditMode}>
            Finish
          </Button>
        </div>
      </div>
    </Draggable>
  );
});

export default EditModeController;
