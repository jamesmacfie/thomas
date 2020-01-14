import React from 'react';
import IconSearchList from 'components/iconSearchList';

interface Props {
  form: any;
  name: string;
}

const FormikInputIcon = ({ form, name, ...props }: Props) => {
  const onSelect = (iconName: string) => {
    form.setFieldValue(name, iconName);
  };
  return (
    <IconSearchList
      onSelect={onSelect}
      showLabel={false}
      className="mb-4"
      iconListClassName="h-64 overflow-y-scroll"
      {...props}
    />
  );
};

export default FormikInputIcon;
