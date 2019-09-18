import React, { useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as DeviceStoreContext } from 'stores/device';
import Loader from 'components/loader';

interface Props {
  children: ReactNode;
}

const DeviceWrapper = observer(({ children }: Props) => {
  const deviceStore = useContext(DeviceStoreContext);

  // Wait until we have at least got an empty list of devices
  if (deviceStore.otherDevices === null) {
    return <Loader fullPage />;
  }

  if (!deviceStore.hasDeviceId && !deviceStore.otherDevices.length) {
    return <p>No devices. Create one!</p>;
  }

  if (!deviceStore.hasDeviceId && deviceStore.otherDevices.length) {
    return (
      <>
        <p>You need to choose here</p>
        {deviceStore.otherDevices.map(d => (
          <button onClick={() => deviceStore.setDeviceId(d.id)}>{d.id}</button>
        ))}
      </>
    );
  }

  if (deviceStore.hasDeviceId && deviceStore.device === null) {
    return <Loader fullPage />;
  }

  return <>{children}</>;
});

export default DeviceWrapper;
