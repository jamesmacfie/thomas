import React, { useContext } from 'react';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { StoreContext as DevicesStoreContext } from 'stores/devices';
import { StoreContext as DeviceViewStoreContest } from 'stores/deviceViews';
import Button from 'components/button';
import FormikInput from 'components/formikInput';
import { createDeviceView } from 'validations/deviceView';

interface Props {
  onClose: (deviceView: DeviceView) => void;
}

const CreateDeviceViewForm = observer(({ onClose }: Props) => {
  const deviceStore = useContext(DevicesStoreContext);
  const deviceViewStore = useContext(DeviceViewStoreContest);
  return (
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
            onClose(deviceView);
          });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormikInput name="name" label="Name" placeholder="Name" />
          <FormikInput type="icon" name="icon" label="Icon" />
          <Button color="primary" type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </form>
      )}
    </Formik>
  );
});

export default CreateDeviceViewForm;
