import React, { useContext } from 'react';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { object } from 'yup';
import IntegrationsStore, { StoreContext as IntegrationStoreContext } from 'stores/integrations';
import Button from 'components/button';
import FormikInput from 'components/formikInput';
import { createSchema } from 'utils/yupSchemaFromJson';

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

  return (
    <Formik
      initialValues={integration.config}
      validationSchema={validateAgainst}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        if (allIntegrations.length) {
          await integrationstore.updateExistingIntegration(integration.id, values);
        } else {
          await integrationstore.saveNewIntegration('darksky', values);
        }
        await integrationstore.getIntegrations();
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="pr-4">
          {config.map(c => (
            <FormikInput key={c.key} name={c.key} value={values[c.key]} label={c.label} />
          ))}
          <Save submitting={isSubmitting} onClick={() => {}} />
        </form>
      )}
    </Formik>
  );
});

export default IntegrationConfigForm;
