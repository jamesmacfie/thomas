import React from 'react';
import InputSelect from 'components/select';

interface Props {
  form: any;
  name: string;
  values?: any;
  value?: string | number;
}

const FormikInputSelect = ({ form, name, value, values }: Props) => {
  const onChange = (option: any) => {
    form.setFieldValue(name, option.value);
  };
  const v = values.find((d: any) => d.value === value) || values[0];

  return <InputSelect value={v} options={values} onChange={onChange} />;
};

export default FormikInputSelect;
