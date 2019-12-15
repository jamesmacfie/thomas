import React from 'react';
import { useOtherDevices } from 'stores/devices/hooks';
import { store as devicesStore } from 'stores/devices';
import Panel from 'components/panel';
import Select from 'components/select';

const DeviceChooser = () => {
  const otherDevices = useOtherDevices();
  const onSelect = (option: any) => {
    devicesStore.setDeviceId(option.value);
  };
  const selectValues = otherDevices!.map(d => ({
    value: d.id,
    label: d.name
  }));
  console.log('SV', selectValues);
  const a = [
    {
      value: 1,
      label: 'boo'
    },
    {
      value: 2,
      label: 'boo2'
    }
  ];
  return (
    <div className="w-128 h-128 relative absolute-center">
      <Panel>
        <p className="text-5xl text-center">📱</p>
        <p className="mb-4 text-center">Which device is this?</p>
        <Select values={a} onChange={onSelect} />
      </Panel>
    </div>
  );
};

export default DeviceChooser;
