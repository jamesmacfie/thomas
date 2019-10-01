import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as DeviceViewStoreContext } from 'stores/deviceViews';
import { StoreContext as ViewStoreContext } from 'stores/views';
import ViewPillList from 'containers/viewPillList';
import { H3 } from 'components/text';

interface Props {
  onClose: () => void;
}

const NewDeviceViewFromExisting = observer(({ onClose }: Props) => {
  const deviceViewStore = useContext(DeviceViewStoreContext);
  const viewStore = useContext(ViewStoreContext);

  const add = async (viewId: number) => {
    const view = viewStore.views[viewId];
    try {
      await deviceViewStore.createDeviceViewFromExisting({
        viewId,
        name: view.name,
        icon: view.icon
      });
      onClose();
    } catch (err) {
      console.error(err);
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
