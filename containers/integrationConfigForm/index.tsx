import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { object } from 'yup';
import IntegrationsStore, { StoreContext as IntegrationStoreContext } from 'stores/integrations';
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
  config: FormConfig[];
  integration: any;
  allIntegrations: any[];
  initialValues?: any;
}

const Save = ({ submitting }: SaveProps) => {
  return (
    <Button color="primary" padding={false} type="submit" disabled={submitting}>
      <span className="px-6 py-2 inline-block">Save</span>
    </Button>
  );
};

const IntegrationConfigForm = observer(({ config, integration, allIntegrations }: Props) => {
  const [success, setSuccess] = useState(false);
  const [errored, setErrored] = useState(false);
  const integrationstore = useContext(IntegrationStoreContext) as IntegrationsStore;
  const validationSchema = config.reduce(createSchema, {});
  const validateAgainst = object().shape(validationSchema);

  const configInitialValues: { [key: string]: string | number } = {};
  Object.values(config).forEach(c => {
    if (c.defaultValue) {
      configInitialValues[c.key] = c.defaultValue;
    }
  });

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
        initialValues={{
          ...configInitialValues,
          ...integration.config
        }}
        validationSchema={validateAgainst}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting }) => {
          logger.debug('Submitting <IntegrationConfigForm />', { values });
          setSuccess(false);
          setErrored(false);
          setSubmitting(true);
          try {
            if (allIntegrations.length) {
              logger.debug('Updating existing integration', { integration });
              await integrationstore.update(integration.id, values);
            } else {
              logger.debug('Creating new integration', { integration });
              await integrationstore.insert(integration.slug, values);
            }
            await integrationstore.fetch();
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
          <form onSubmit={handleSubmit} className="pr-4">
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
});

export default IntegrationConfigForm;
