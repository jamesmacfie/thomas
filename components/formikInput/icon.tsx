import React from 'react';
import IconSearchList from 'components/iconSearchList';

interface Props {
  onChange: any;
}

const FormikInputIcon = ({ onChange }: Props) => {
  const onSelect = (iconName: string) => {
    onChange({
      target: {
        value: iconName
      }
    });
  };
  return (
    <IconSearchList onSelect={onSelect} showLabel={false} className="mb-4" iconListClassName="h-64 overflow-y-scroll" />
  );
};

export default FormikInputIcon;
