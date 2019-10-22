import React, { useState, useContext } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import Select from 'react-select';
import IntegrationsStore, { StoreContext } from 'stores/integrations';
import SystemIntegrationSelect from 'containers/systemIntegrationSelect';
import logger from 'utils/logger';

export type IntegrationSelectChange = {
  integrationId: number | null;
  integrationSlug: string | null;
};

interface Props {
  className?: string;
  onChange: (integration: IntegrationSelectChange) => void;
}

const IntegrationSelect = observer(({ className, onChange }: Props) => {
  const store = useContext(StoreContext) as IntegrationsStore;
  const [systemIntegrationSlug, setSystemIntegrationSlug] = useState<null | string>(null);
  const [integrationId, setIntegrationId] = useState<null | number>(null);
  const onSystemIntegrationChangeHandler = (slug: any) => {
    logger.debug('<SystemIntegrationSelect /> change', { slug });
    setSystemIntegrationSlug(slug);

    const systemIntegration = store.systemIntegrations[slug];
    let iId = null;
    if (!systemIntegration) {
      logger.error('Cannot find integration for slug', { slug });
      return;
    }
    if (systemIntegration.requiresSettings && !systemIntegration.singular) {
      console.log(slug);
      // Set id here, only one required.
      const i = Object.values(store.integrations).filter(i => i.slug === slug);
      setIntegrationId(i[0].id);
      // TODO - what if the integration hasn't been setup?
    }

    onChange({ integrationId: iId ? iId : integrationId, integrationSlug: systemIntegrationSlug });
  };
  const onIntegrationChangeHandler = (iId: any) => {
    logger.debug('<IntegrationSelect /> change', { integrationId: iId });
    setIntegrationId(iId);

    onChange({ integrationId, integrationSlug: systemIntegrationSlug });
  };

  const options = Object.values(store.integrations).map((i: Integration) => {
    // TODO - this will display correctly with a single integration
    const systemIntegration = store.systemIntegrations[i.slug];
    return {
      value: i.id,
      label: systemIntegration.name // TODO - Better name etc here
    };
  });

  // TODO - clean up. Many nested ifs here
  let integrationSelect = null;
  if (systemIntegrationSlug) {
    const systemIntegration = store.systemIntegrations[systemIntegrationSlug];
    if (!systemIntegration) {
      logger.error('Cannot find integration for slug', { systemIntegrationSlug });
    } else {
      // Only show integrationSelect if we are required to enter settings for it and it's not singular
      if (systemIntegration.requiresSettings && !systemIntegration.singular) {
        integrationSelect = (
          <Select
            onChange={onIntegrationChangeHandler}
            className={cn(className, 'react-select-container')}
            classNamePrefix="react-select"
            options={options}
          />
        );
      }
    }
  }

  return (
    <div className={className}>
      <SystemIntegrationSelect onChange={onSystemIntegrationChangeHandler} />
      {integrationSelect}
    </div>
  );
});

export default IntegrationSelect;
