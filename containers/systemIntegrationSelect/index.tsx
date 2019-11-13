import React from 'react';
import cn from 'classnames';
import Select from 'react-select';
import { useSystemIntegrations } from 'stores/integrations/hooks';
import logger from 'utils/logger';

interface Props {
  className?: string;
  onChange: (integrationSlug: string) => void;
}

const SystemIntegrationSelect = ({ className, onChange }: Props) => {
  const systemIntegrations = useSystemIntegrations();
  const onChangeHandler = (option: any) => {
    logger.debug('<SystemIntegrationSelect /> change', { option });
    onChange(option.value);
  };

  const options = Object.values(systemIntegrations).map((i: SystemIntegration) => ({
    value: i.slug,
    label: i.name
  }));

  return (
    <Select
      onChange={onChangeHandler}
      className={cn(className, 'react-select-container')}
      classNamePrefix="react-select"
      options={options}
    />
  );
};

export default SystemIntegrationSelect;
