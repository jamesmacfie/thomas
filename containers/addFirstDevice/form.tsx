import React, { useState } from 'react';
import { Formik } from 'formik';
import { store as devicesStore } from 'stores/devices';
import Button from 'components/button';
import FormikInput from 'components/formikInput';
import Alert from 'components/alert';
import { createDeviceView } from 'validations/deviceView';
import logger from 'utils/logger';

interface Props {
  onClose: () => void;
}

interface Formalues {
  name: string;
  icon: string;
}

const CreateDeviceViewForm = ({ onClose }: Props) => {
  const [error, setError] = useState<String>('');
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
        logger.debug('Submitting <AddFirstDevice />', { values });
        setSubmitting(true);
        try {
          await devicesStore.insert(values);
          onClose();
        } catch (error) {
          logger.error('Error submitting <AddFirstDevice />', { error });
          setError(`Error submitting first device: ${error.message}`);
          setSubmitting(false);
        }
      }}
    >
      {({ touched, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {!!error.length && (
            <Alert type="ERROR" className="mb-4">
              {error}
            </Alert>
          )}
          <FormikInput name="name" label="Name" placeholder="Name" />
          <FormikInput type="icon" name="icon" label="Icon" />
          <FormikInput type="map" name="position" label="Where are you?" />
          <Button color="primary" type="submit" disabled={isSubmitting || !touched}>
            Create
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default CreateDeviceViewForm;
