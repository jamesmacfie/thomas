import React, { useContext } from 'react';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { StoreContext as DeviceStoreContext } from 'stores/device';
import { StoreContext as DeviceViewStoreContest } from 'stores/deviceViews';
import Modal from 'components/modal';
import Button from 'components/button';
import FormikInput from 'components/formikInput';
import { createDeviceView } from 'validations/deviceView';

interface Props {
  onClose: () => void;
}

const AddNewDeviceViewModal = observer(({ onClose }: Props) => {
  const deviceStore = useContext(DeviceStoreContext);
  const deviceViewStore = useContext(DeviceViewStoreContest);
  return (
    <Modal size="md" onClose={onClose}>
      <Formik
        initialValues={{}}
        validationSchema={createDeviceView}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          // TODO - this should live inside the device view store
          await fetch(`/device/${deviceStore.getDeviceId()}/view`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              ...values,
              createNewView: true
            })
          })
            .then(res => res.json())
            .then(deviceView => {
              deviceViewStore.addDeviceView(deviceView);
              setSubmitting(false);
              onClose();
            });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormikInput name="name" label="Name" />
            <FormikInput name="icon" label="Icon" />
            <Button color="primary" type="submit" disabled={isSubmitting}>
              Save
            </Button>
          </form>
        )}
      </Formik>
    </Modal>
  );
});

export default AddNewDeviceViewModal;
