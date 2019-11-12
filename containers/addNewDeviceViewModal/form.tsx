import React, { useState } from 'react';
import { Formik } from 'formik';
import { store as deviceViewsStore } from 'stores/deviceViews';
import Button from 'components/button';
import FormikInput from 'components/formikInput';
import Alert from 'components/alert';
import { createDeviceView } from 'validations/deviceView';
import logger from 'utils/logger';

interface Props {
  onClose: (deviceView: DeviceView) => void;
}

interface FormValues {
  name: string;
  icon: string;
}

const CreateDeviceViewForm = ({ onClose }: Props) => {
  const [error, setError] = useState<string>('');
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
        logger.debug('Submitting <CreateDeviceViewForm />', { values });
        setSubmitting(true);
        try {
          const deviceView = await deviceViewsStore.insert(values);
          setSubmitting(false);
          onClose(deviceView);
        } catch (error) {
          logger.error('Error submitting <CreateDeviceViewForm />', { error });
          setError(`Error submitting first view: ${error.message}`);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {!!error.length && (
            <Alert type="ERROR" className="mb-4">
              {error}
            </Alert>
          )}
          <FormikInput name="name" label="Name" placeholder="Name" />
          <FormikInput type="icon" name="icon" label="Icon" />
          <Button color="primary" type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default CreateDeviceViewForm;
