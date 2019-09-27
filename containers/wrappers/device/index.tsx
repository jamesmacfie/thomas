import React, { useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as DevicesStoreContext } from 'stores/devices';

interface Props {
  children: ReactNode;
}

const DeviceWrapper = observer(({ children }: Props) => {
  const deviceStore = useContext(DevicesStoreContext);

  // Wait until we have at least got an empty list of devices
  if (deviceStore.otherDevices === null) {
    return null;
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
    return null;
  }

  return <>{children}</>;
});

export default DeviceWrapper;
