import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from 'stores/device';
import Modal from 'components/modal';
import Label from 'components/label';
import Input from 'components/input';
import Button from 'components/button';

interface Props {
  onClose: () => void;
}

const AddNewDeviceViewModal = observer(({ onClose }: Props) => {
  const deviceStore = useContext(StoreContext);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const create = async () => {
    setSubmitting(true);
    await fetch(`/device/${deviceStore.getDeviceId()}/view`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: 'test',
        icon: 'floppy',
        viewId: 7,
        createNewView: false
      })
    })
      .then(res => res.json())
      .then(deviceView => {
        console.log('DEVICEVIEW', deviceView);
        setSubmitting(false);
      });
  };

  return (
    <Modal size="md" onClose={onClose}>
      <Label>Icon</Label>
      <Input className="block mb-4 w-96" />
      <Label>Name</Label>
      <Input className="block mb-4 w-96" />
      <Label>View Id</Label>
      <Input className="block mb-4 w-96" />
      <Button disabled={submitting} color="primary" onClick={create}>
        add
      </Button>
    </Modal>
  );
});

export default AddNewDeviceViewModal;
