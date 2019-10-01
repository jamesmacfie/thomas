import React, { useContext } from 'react';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { StoreContext as DeviceViewStoreContest } from 'stores/deviceViews';
import Button from 'components/button';
import FormikInput from 'components/formikInput';
import { createDeviceView } from 'validations/deviceView';

interface Props {
  onClose: (deviceView: DeviceView) => void;
}

interface FormValues {
  name: string;
  icon: string;
}

const CreateDeviceViewForm = observer(({ onClose }: Props) => {
  const deviceViewStore = useContext(DeviceViewStoreContest);
  return (
    <Formik
      initialValues={{
        name: '',
        icon: ''
      }}
      validationSchema={createDeviceView}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values: FormValues, { setSubmitting }) => {
        setSubmitting(true);
        try {
          const deviceView = await deviceViewStore.createDeviceView(values);
          setSubmitting(false);
          onClose(deviceView);
        } catch (err) {
          console.error(err);
          setSubmitting(false);
        }
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
