import React from 'react';
import cn from 'classnames';
import Select from 'react-select';
import { useSystemIntegration } from 'stores/integrations/hooks';
import logger from 'utils/logger';

interface Props {
  className?: string;
  integrationSlug: string;
  onChange: (integrationSlug: string) => void;
}

const SystemIntegrationWidgetSelect = ({ className, integrationSlug, onChange }: Props) => {
  const systemIntegration = useSystemIntegration(integrationSlug);
  const onChangeHandler = (option: any) => {
    logger.debug('<SystemIntegrationWidgetSelect /> change', { option });
    onChange(option.value);
  };

  if (!systemIntegration) {
    return <p>No integration for {integrationSlug}</p>;
  }

  if (!systemIntegration.widgets || !systemIntegration.widgets.length) {
    return <p className="mb-4">No widgets have been setup for {integrationSlug} 🤷‍♂️</p>;
  }

  const options = systemIntegration.widgets.map((i: SystemIntegrationWidget) => ({
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

export default SystemIntegrationWidgetSelect;
