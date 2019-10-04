import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as DeviceViewStoreContext } from 'stores/deviceViews';
import { StoreContext as ViewStoreContext } from 'stores/views';
import ViewPillList from 'containers/viewPillList';
import { H3 } from 'components/text';
import logger from 'utils/logger';

interface Props {
  onClose: () => void;
}

const NewDeviceViewFromExisting = observer(({ onClose }: Props) => {
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
      // TODO - should show a message here
    }
  };

  return (
    <>
      <H3>Choose which view you want to add.</H3>
      <ViewPillList onSelect={add} />
    </>
  );
});

export default NewDeviceViewFromExisting;
