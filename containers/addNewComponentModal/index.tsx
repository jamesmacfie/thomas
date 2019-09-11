// TODO - what's with all the commented out code here. Also create should be in the store
import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as DeviceStoreContext } from 'stores/device';
import { StoreContext as ViewsStoreContext } from 'stores/views';
import { useRouter } from 'next/router';
import Button from 'components/button';
import Modal from 'components/modal';
import Label from 'components/label';
import Input from 'components/input';

interface Props {
  onClose: () => void;
}

const NewComponent = observer(({ onClose }: Props) => {
  const deviceStore = useContext(DeviceStoreContext);
  const viewsStore = useContext(ViewsStoreContext);
  const [integrationSlug, setIntegrationSlug] = useState<string>('');
  const [componentSlug, setComponentSlug] = useState<string>('');
  const { query } = useRouter();

  const create = async () => {
    // TODO - move to correct store
    const viewId = Array.isArray(query.id) ? query.id[0] : query.id;
    const component = await fetch(`/component`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        deviceId: deviceStore.getDeviceId(),
        integrationId: 10,
        integrationSlug,
        componentSlug,
        viewId,
        config: { x: 0, y: Infinity, h: 2, w: 2 } // Default. React grid layout will adjust
      })
    }).then(res => res.json());

    viewsStore.addComponent(viewId, component);

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
