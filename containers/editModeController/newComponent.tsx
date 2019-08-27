import React, { useState, useContext } from 'react';
// import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import DeviceStore, { StoreContext } from 'stores/device';
// import DeviceViewStore, { StoreContext as DeviceViewStoreContext } from 'stores/deviceViews';
// import ViewStore, { StoreContext as ViewStoreContext } from 'stores/views';
import Button from 'components/button';
import Icon from 'components/icon';
import Modal from 'components/modal';
import Label from 'components/label';
import Input from 'components/input';

const NewComponent = observer(() => {
  const store = useContext(StoreContext) as DeviceStore;
  // const deviceViewStore = useContext(DeviceViewStoreContext) as DeviceViewStore;
  // const viewStore = useContext(ViewStoreContext) as ViewStore;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [integrationSlug, setIntegrationSlug] = useState<string>('');
  const [componentSlug, setComponentSlug] = useState<string>('');
  // const { query } = useRouter();

  const closeModal = () => {
    setModalVisible(false);
  };

  const create = async () => {
    // const deviceViewId = Array.isArray(query.id) ? query.id[0] : query.id;
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
    closeModal();
  };

  return (
    <>
      {modalVisible && (
        <Modal title="Create new component" size="md" onClose={closeModal}>
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
          <Button type="primary" onClick={create}>
            Create
          </Button>
        </Modal>
      )}
      <Icon onClick={() => setModalVisible(true)} icon="addCircle" className="w-8 h-8 white current-stroke" />
    </>
  );
});

export default NewComponent;
