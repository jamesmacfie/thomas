import React, { useContext } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import Select from 'react-select';
import IntegrationsStore, { StoreContext } from 'stores/integrations';
import logger from 'utils/logger';

interface Props {
  className?: string;
  onChange: (integrationId: number) => void;
}

const IntegrationSelect = observer(({ className, onChange }: Props) => {
  const store = useContext(StoreContext) as IntegrationsStore;
  const onChangeHandler = (option: any) => {
    logger.debug('<IntegrationSelect /> change', { option });
    onChange(option.value);
  };

  const options = Object.values(store.integrations).map((i: Integration) => {
    // TODO - this will display correctly with a single integration
    const systemIntegration = store.systemIntegrations[i.slug];
    return {
      value: i.id,
      label: systemIntegration.name // TODO - Better name etc here
    };
  });

  return (
    <Select
      onChange={onChangeHandler}
      className={cn(className, 'react-select-container')}
      classNamePrefix="react-select"
      options={options}
    />
  );
});

export default IntegrationSelect;
