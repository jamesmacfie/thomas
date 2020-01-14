import React from 'react';
import Code from 'components/code';

interface Props {
  form: any;
  name: string;
  value: string;
}

const FormikInputCode = ({ form, name, value, ...props }: Props) => {
  const onChange = (v: string) => {
    form.setFieldValue(name, v);
  };
  return <Code value={value} className="mb-4" {...props} onChange={onChange} />;
};

export default FormikInputCode;
