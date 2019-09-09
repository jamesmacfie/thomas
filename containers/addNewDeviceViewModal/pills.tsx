import React from 'react';
import IconPill from 'components/iconPill';

interface Props {
  onSelect: (key: string) => void;
}

const Pills = ({ onSelect }: Props) => {
  const pills = [
    {
      key: 'existing',
      icon: 'clone',
      name: 'Existing'
    },
    {
      key: 'new',
      icon: 'plus-circle',
      name: 'New'
    }
  ];

  return <IconPill onSelect={onSelect} pills={pills} />;
};

export default Pills;
