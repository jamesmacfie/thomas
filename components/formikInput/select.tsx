import React from 'react';
import Select from 'react-select';

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

  return (
    <Select
      value={v}
      options={values}
      onChange={onChange}
      className="mb-4 react-select-container"
      classNamePrefix="react-select"
    />
  );
};

export default FormikInputSelect;
