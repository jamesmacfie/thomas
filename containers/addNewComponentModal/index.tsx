// TODO - what's with all the commented out code here. Also create should be in the store
import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import DeviceStore, { StoreContext } from 'stores/device';
import Button from 'components/button';
import Modal from 'components/modal';
import Label from 'components/label';
import Input from 'components/input';

interface Props {
  onClose: () => void;
}

const NewComponent = observer(({ onClose }: Props) => {
  const store = useContext(StoreContext) as DeviceStore;
  const [integrationSlug, setIntegrationSlug] = useState<string>('');
  const [componentSlug, setComponentSlug] = useState<string>('');

  const create = async () => {
    // TODO - move to correct store
    // const deviceViewId = Array.isArray(query.id) ? query.id[0] : query.id;
    // TODO - This is incorrect
    const viewId = `;`; // deviceViewStore.getViewIdFromDeviceViewId(deviceViewId);
    await fetch(`/component`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        deviceId: store.getDeviceId(),
        integrationId: 10,
        integrationSlug,
        componentSlug,
        viewId,
        config: { x: 0, y: Infinity, h: 2, w: 2 } // Default. React grid layout will adjust
      })
    }).then(res => res.json());
    // viewStore.addViewComponent(viewId, component);

    // And tidy up
    setIntegrationSlug('');
    setComponentSlug('');
    onClose();
  };

  return (
    <Modal title="Create new component" size="sm" onClose={onClose}>
      <Label>Integration</Label>
      <Input
        className="block mb-4 w-96"
        value={integrationSlug}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIntegrationSlug(e.target.value);
        }}
      />
      <Label>Compoent</Label>
      <Input
        className="block mb-4 w-96"
        value={componentSlug}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setComponentSlug(e.target.value);
        }}
      />
      <Button color="primary" onClick={create}>
        Create
      </Button>
    </Modal>
  );
});

export default NewComponent;
