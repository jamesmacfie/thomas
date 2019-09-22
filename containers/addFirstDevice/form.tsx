import React, { useContext } from 'react';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { StoreContext as DevicesStoreContext } from 'stores/devices';
import Button from 'components/button';
import FormikInput from 'components/formikInput';
import { createDeviceView } from 'validations/deviceView';

interface Props {
  onClose: () => void;
}

interface Formalues {
  name: string;
  icon: string;
}

const CreateDeviceViewForm = observer(({ onClose }: Props) => {
  const devicesStore = useContext(DevicesStoreContext);
  return (
    <Formik
      initialValues={{
        name: '',
        icon: ''
      }}
      validationSchema={createDeviceView}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values: Formalues, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await devicesStore.addDevice(values);
          onClose();
        } catch (err) {
          console.error('Error creating first device', err);
          // TODO - should show a message here
        }
      }}
    >
      {({ touched, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormikInput name="name" label="Name" placeholder="Name" />
          <FormikInput type="icon" name="icon" label="Icon" />
          <Button color="primary" type="submit" disabled={isSubmitting || !touched}>
            Create
          </Button>
        </form>
      )}
    </Formik>
  );
});

export default CreateDeviceViewForm;
