import React from 'react';
import Label from 'components/label';
import Input from 'components/input';

interface Props {
  config: FormConfig[];
  initialValues?: {
    [key: string]: string;
  };
}

interface InputProps {
  config: FormConfig;
  initialValue?: string;
}

const FormInput = ({ config, initialValue }: InputProps) => {
  return (
    <div className="mb-4">
      <Label>{config.label}</Label>
      <Input className="block mb-4 w-96" value={initialValue} />
    </div>
  );
};

const ConfigForm = ({ config, initialValues = {} }: Props) => {
  console.log(initialValues);
  return (
    <>
      {config.map(c => (
        <FormInput config={c} initialValue={initialValues[c.key]} />
      ))}
    </>
  );
};

export default ConfigForm;
