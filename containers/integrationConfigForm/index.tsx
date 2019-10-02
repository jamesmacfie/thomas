import React, { useContext } from 'react';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { object } from 'yup';
import IntegrationsStore, { StoreContext as IntegrationStoreContext } from 'stores/integrations';
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
        setSubmitting(true);
        if (allIntegrations.length) {
          logger.debug('Updating existing integration', { integration });
          await integrationstore.updateExistingIntegration(integration.id, values);
        } else {
          logger.debug('Creating new integration', { integration });
          await integrationstore.saveNewIntegration(integration.slug, values);
        }
        await integrationstore.getIntegrations();
        setSubmitting(false);
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
  );
});

export default IntegrationConfigForm;
