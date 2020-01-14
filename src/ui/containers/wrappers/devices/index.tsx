import React, { useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as DevicesStoreContext } from 'stores/devices';
import AddFirstDevice from 'containers/addFirstDevice';
import ExistingDeviceChooser from 'containers/existingDeviceChooser';

interface Props {
  children: ReactNode;
}

const DevicesWrapper = observer(({ children }: Props) => {
  const deviceStore = useContext(DevicesStoreContext);

  // Wait until we have at least got an empty list of devices
  if (deviceStore.otherDevices === null) {
    return null;
  }

  if (!deviceStore.hasDeviceId && !deviceStore.otherDevices.length) {
    return <AddFirstDevice />;
  }

  if (!deviceStore.hasDeviceId && deviceStore.otherDevices.length) {
    return <ExistingDeviceChooser />;
  }

  if (deviceStore.hasDeviceId && deviceStore.device === null) {
    return null;
  }

  return <>{children}</>;
});

export default DevicesWrapper;
