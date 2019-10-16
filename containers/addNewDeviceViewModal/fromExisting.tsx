import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as DeviceViewStoreContext } from 'stores/deviceViews';
import { StoreContext as ViewStoreContext } from 'stores/views';
import ViewPillList from 'containers/viewPillList';
import Alert from 'components/alert';
import { H3 } from 'components/text';
import logger from 'utils/logger';

interface Props {
  onClose: () => void;
}

const NewDeviceViewFromExisting = observer(({ onClose }: Props) => {
  const [error, setError] = useState<String>('');
  const deviceViewStore = useContext(DeviceViewStoreContext);
  const viewStore = useContext(ViewStoreContext);

  const add = async (viewId: number) => {
    logger.debug('Adding device view from existing', { viewId });
    const view = viewStore.views[viewId];
    try {
      await deviceViewStore.insert({
        viewId,
        name: view.name,
        icon: view.icon
      });
      onClose();
    } catch (error) {
      logger.error('Error adding device view from existing', { error });
      setError(`Error creating view from existing: ${error.message}`);
    }
  };

  return (
    <>
      {!!error.length && (
        <Alert type="ERROR" className="mb-4">
          {error}
        </Alert>
      )}
      <H3>Choose which view you want to add.</H3>
      <ViewPillList onSelect={add} />
    </>
  );
});

export default NewDeviceViewFromExisting;
