import React, { useState } from 'react';
import { Formik } from 'formik';
import { object } from 'yup';
import { store as integrationsStore } from 'stores/integrations';
import { store as configStore } from 'stores/config';
import Alert from 'components/alert';
import Button from 'components/button';
import FormikInput from 'components/formikInput';
import { createSchema } from 'utils/yupSchemaFromJson';
import logger from 'utils/logger';

interface SaveProps {
  onClick: () => void;
  submitting: boolean;
}

interface Props {
  integration?: Integration;
  systemIntegration: SystemIntegration;
  initialValues?: any;
}

const Save = ({ submitting }: SaveProps) => {
  return (
    <Button color="primary" padding={false} type="submit" disabled={submitting}>
      <span className="px-6 py-2 inline-block">Save</span>
    </Button>
  );
};

const IntegrationConfigForm = ({ systemIntegration, integration }: Props) => {
  const [success, setSuccess] = useState(false);
  const [errored, setErrored] = useState(false);
  const config = systemIntegration.settings!;
  const validationSchema = config.reduce(createSchema, {});
  const validateAgainst = object().shape(validationSchema);

  const configInitialValues: { [key: string]: string | number } = {};
  Object.values(config).forEach(c => {
    if (c.defaultValue) {
      configInitialValues[c.key] = c.defaultValue;
    } else if (c.defaultConfig) {
      configInitialValues[c.key] = configStore.configs[c.defaultConfig].value;
    }
  });

  let initialValues = configInitialValues;
  if (integration) {
    initialValues = Object.assign({}, initialValues, integration.config);
  }

  return (
    <>
      {success && (
        <Alert className="mb-3 mr-4" type="SUCCESS">
          Saved successfully.
        </Alert>
      )}
      {errored && (
        <Alert className="mb-3 mr-4" type="ERROR">
          Something went wrong.
        </Alert>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validateAgainst}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting }) => {
          logger.debug('Submitting <IntegrationConfigForm />', { values });
          setSuccess(false);
          setErrored(false);
          setSubmitting(true);
          try {
            if (integration) {
              logger.debug('Updating existing integration', { integration });
              await integrationsStore.update(integration.id, values);
            } else {
              logger.debug('Creating new integration', { integration });
              await integrationsStore.insert(systemIntegration.slug, values);
            }
            await integrationsStore.fetch();
            setSubmitting(false);
            setSuccess(true);
          } catch (error) {
            logger.error('Error saving integration', { error });
            setSubmitting(false);
            setErrored(true);
          }
        }}
      >
        {({ values, isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="pr-4 max-w-lg mx-auto">
            {config.map(c => (
              <FormikInput
                key={c.key}
                name={c.key}
                values={c.values}
                defaultValue={c.defaultValue}
                value={values[c.key]}
                label={c.label}
                type={c.type}
              />
            ))}
            <Save submitting={isSubmitting} onClick={() => {}} />
          </form>
        )}
      </Formik>
    </>
  );
};

export default IntegrationConfigForm;
