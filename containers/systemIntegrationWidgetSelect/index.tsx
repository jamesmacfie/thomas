import React, { useContext } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import Select from 'react-select';
import IntegrationsStore, { StoreContext } from 'stores/integrations';

interface Props {
  className?: string;
  integrationSlug: string;
  onChange: (integrationSlug: string) => void;
}

const SystemIntegrationWidgetSelect = observer(({ className, integrationSlug, onChange }: Props) => {
  const store = useContext(StoreContext) as IntegrationsStore;
  const onChangeHandler = (option: any) => {
    onChange(option.value);
  };

  const integration = store.systemIntegrations![integrationSlug];
  if (!integration) {
    return <p>No integration for {integrationSlug}</p>;
  }

  const options = integration.widgets.map((i: SystemIntegrationWidget) => ({
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

export default SystemIntegrationWidgetSelect;
