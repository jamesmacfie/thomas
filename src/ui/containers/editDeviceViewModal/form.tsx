import React, { useState } from 'react';
import { Formik } from 'formik';
import { store as deviceViewsStore } from 'stores/deviceViews';
import { useDeviceView } from 'stores/deviceViews/hooks';
import Button from 'components/button';
import FormikInput from 'components/formikInput';
import Alert from 'components/alert';
import { updateDeviceview } from 'validations/deviceView';
import logger from 'utils/logger';

interface Props {
  onClose: (deviceView: DeviceView) => void;
  viewId: number;
}

interface FormValues {
  name: string;
  icon: string;
}

const EditDeviceViewForm = ({ viewId, onClose }: Props) => {
  const [error, setError] = useState<string>('');
  const deviceView = useDeviceView(viewId);
  if (!deviceView) {
    return (
      <Alert type="ERROR" className="mb-4">
        No view with id {viewId}
      </Alert>
    );
  }
  return (
    <Formik
      initialValues={{
        name: deviceView.name,
        icon: deviceView.icon
      }}
      validationSchema={updateDeviceview}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values: FormValues, { setSubmitting }) => {
        logger.debug('Submitting <EditDeviceViewForm />', { values });
        setSubmitting(true);
        try {
          const updatedDeviceView = await deviceViewsStore.update({ viewId, ...values });
          setSubmitting(false);
          onClose(updatedDeviceView);
        } catch (error) {
          logger.error('Error submitting <EditDeviceViewForm />', { error });
          setError(`Error submitting update view: ${error.message}`);
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

export default EditDeviceViewForm;
