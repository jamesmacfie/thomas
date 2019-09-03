import React from 'react';
import IconPill from 'components/iconPill';

interface Props {
  onSelect: (key: string) => void;
}

const Pills = ({ onSelect }: Props) => {
  const pills = [
    {
      key: 'existing',
      icon: 'floppy',
      name: 'Existing'
    },
    {
      key: 'new',
      icon: 'armchair',
      name: 'New'
    }
  ];

  return <IconPill onSelect={onSelect} pills={pills} />;
};

export default Pills;
