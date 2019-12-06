import React, { useState } from 'react';
import { Formik } from 'formik';
import { store as devicesStore } from 'stores/devices';
import { store as configStore } from 'stores/config';
import Button from 'components/button';
import FormikInput from 'components/formikInput';
import { defaultValue } from 'components/formikInput/map';
import Alert from 'components/alert';
import { createDeviceView } from 'validations/deviceView';
import logger from 'utils/logger';

interface Props {
  onClose: () => void;
}

interface Formalues {
  name: string;
  icon: string;
  position: number[];
}

const CreateDeviceViewForm = ({ onClose }: Props) => {
  const [error, setError] = useState<String>('');
  return (
    <Formik
      initialValues={{
        name: '',
        icon: '',
        position: defaultValue
      }}
      validationSchema={createDeviceView}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async ({ icon, name, position }: Formalues, { setSubmitting }) => {
        logger.debug('Submitting <AddFirstDevice />', { icon, name, position });
        setSubmitting(true);
        try {
          await configStore.insert({ description: 'Default latitude', slug: 'latitude', value: position[0] });
          await configStore.insert({ description: 'Default longitude', slug: 'longitude', value: position[1] });
          await devicesStore.insert({ icon, name });
          onClose();
        } catch (error) {
          console.log(onClose);
          logger.error('Error submitting <AddFirstDevice />', { error });
          setError(`Error submitting first device: ${error.message}`);
          setSubmitting(false);
        }
        setSubmitting(false);
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
