import React from 'react';
import { Formik } from 'formik';
import { object } from 'yup';
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

const IntegrationConfigForm = ({ config, integration, allIntegrations }: Props) => {
  const validationSchema = config.reduce(createSchema, {});
  const validateAgainst = object().shape(validationSchema);

  return (
    <Formik
      initialValues={integration.config}
      validationSchema={validateAgainst}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(details, { setSubmitting }) => {
        if (allIntegrations.length) {
          console.log('UPDATE');
        } else {
          console.log('NEW!');
        }
        console.log('values', details);
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {config.map(c => (
            <FormikInput name={c.key} value={values[c.key]} label={c.label} />
          ))}
          <Save submitting={isSubmitting} onClick={() => {}} />
        </form>
      )}
    </Formik>
  );
};

export default IntegrationConfigForm;
