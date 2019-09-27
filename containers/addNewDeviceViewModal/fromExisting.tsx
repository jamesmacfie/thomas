import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as DevicesStoreContext } from 'stores/devices';
import { StoreContext as DeviceViewStoreContext } from 'stores/deviceViews';
import { StoreContext as ViewStoreContext } from 'stores/views';
import ViewPillList from 'containers/viewPillList';
import { H3 } from 'components/text';

interface Props {
  onClose: () => void;
}

const NewDeviceViewFromExisting = observer(({ onClose }: Props) => {
  const deviceStore = useContext(DevicesStoreContext);
  const deviceViewStore = useContext(DeviceViewStoreContext);
  const viewStore = useContext(ViewStoreContext);

  const add = async (viewId: number) => {
    const view = viewStore.views[viewId];
    // TODO - this should live inside the device view store
    await fetch(`/device/${deviceStore.getDeviceId()}/view`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        viewId,
        name: view.name,
        icon: view.icon,
        createNewView: false
      })
    })
      .then(res => res.json())
      .then(deviceView => {
        deviceViewStore.addDeviceView(deviceView);
        onClose();
      });
  };

  return (
    <>
      <H3>Choose which view you want to add.</H3>
      <ViewPillList onSelect={add} />
    </>
  );
});

export default NewDeviceViewFromExisting;
