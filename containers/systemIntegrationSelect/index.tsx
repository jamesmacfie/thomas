import React, { useContext } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import Select from 'react-select';
import IntegrationsStore, { StoreContext } from 'stores/integrations';
import logger from 'utils/logger';

interface Props {
  className?: string;
  onChange: (integrationSlug: string) => void;
}

const SystemIntegrationSelect = observer(({ className, onChange }: Props) => {
  const store = useContext(StoreContext) as IntegrationsStore;
  const onChangeHandler = (option: any) => {
    logger.debug('<SystemIntegrationSelect /> change', { option });
    onChange(option.value);
  };

  const options = Object.values(store.systemIntegrations!).map((i: SystemIntegration) => ({
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
});

export default SystemIntegrationSelect;
