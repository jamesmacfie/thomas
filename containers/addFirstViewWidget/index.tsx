import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import AddNewWidgetModal from 'containers/addNewWidgetModal';
import Panel from 'components/panel';
import Button from 'components/button';
import logger from 'utils/logger';

const AddFirstViewWidget = observer(() => {
  const [addNewModalVisible, setAddNewModalVisble] = useState<boolean>(false);
  const toggleAddNewModalVisible = () => {
    logger.debug('toggleAddNewModalVisible from', { addNewModalVisible });
    setAddNewModalVisble(!addNewModalVisible);
  };

  return (
    <div>
      <div className="w-128 h-128 relative absolute-center">
        <Panel>
          <p className="text-5xl text-center">🦖</p>
          <p className="mb-4 text-center">Add the first widget to this view</p>
          <Button color="primary" className="w-full mb-4" onClick={toggleAddNewModalVisible}>
            Add new widget
          </Button>
        </Panel>
      </div>
      {addNewModalVisible && <AddNewWidgetModal onClose={toggleAddNewModalVisible} />}
    </div>
  );
});

export default AddFirstViewWidget;
