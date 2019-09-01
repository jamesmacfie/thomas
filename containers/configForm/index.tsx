import React from 'react';
import { Formik } from 'formik';
import Label from 'components/label';
import Input from 'components/input';
import Button from 'components/button';

interface SaveProps {
  onClick: () => void;
  submitting: boolean;
}

interface InputProps {
  config: FormConfig;
  value?: string;
}

interface Props {
  config: FormConfig[];
  integration: any;
  initialValues?: any;
}

const Save = ({ submitting }: SaveProps) => {
  return (
    <Button color="primary" padding={false} type="submit" disabled={submitting}>
      <span className="px-6 py-2 inline-block">Save</span>
    </Button>
  );
};

const FormInput = ({ config, value }: InputProps) => {
  return (
    <div className="mb-4">
      <Label>{config.label}</Label>
      <Input className="block mb-4 w-96" value={value} />
    </div>
  );
};

const ConfigForm = ({ config, integration }: Props) => {
  return (
    <Formik
      initialValues={integration.config}
      onSubmit={({ values }, { setSubmitting }) => {
        console.log('VALUES');
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {config.map(c => (
            <FormInput value={values[c.key]} config={c} />
          ))}
          <Save submitting={isSubmitting} onClick={() => {}} />
        </form>
      )}
    </Formik>
  );
};

export default ConfigForm;
