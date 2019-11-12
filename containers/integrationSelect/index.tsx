import React, { useState, useContext } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import Select from 'react-select';
import IntegrationsStore, { StoreContext } from 'stores/integrations';
import SystemIntegrationSelect from 'containers/systemIntegrationSelect';
import Label from 'components/label';
import logger from 'utils/logger';

export type IntegrationSelectChange = {
  integrationId: number | null;
  integrationSlug: string | null;
  noIntegrationSetup: boolean | null;
  requiresIntegrationIdSelection: boolean | null;
};

interface Props {
  className?: string;
  onChange: (integration: IntegrationSelectChange) => void;
}

const IntegrationSelect = observer(({ className, onChange }: Props) => {
  const store = useContext(StoreContext) as IntegrationsStore;
  const [systemIntegrationSlug, setSystemIntegrationSlug] = useState<null | string>(null);
  const [requiresIntegrationIdSelection, setRequiresIntegrationIdSelection] = useState<null | boolean>(null);
  const onSystemIntegrationChangeHandler = (slug: any) => {
    logger.debug('<SystemIntegrationSelect /> change', { slug });
    setSystemIntegrationSlug(slug);

    const systemIntegration = store.systemIntegrations[slug];
    let integrationIdToSet = null;
    let noIntegrationSetupToSet = null;
    let requiresIntegrationIdSelectionToSet = null;
    if (!systemIntegration) {
      logger.error('Cannot find integration for slug', { slug });
      return;
    }
    if (systemIntegration.singular) {
      // Set id here, only one required.
      const i = Object.values(store.integrations).filter(i => i.slug === slug);
      if (i[0]) {
        // Integration has been setup
        integrationIdToSet = i[0].id;
      }
    }

    if (systemIntegration.requiresSettings) {
      requiresIntegrationIdSelectionToSet = true;
      if (!integrationIdToSet && systemIntegration.singular) {
        // Requires setup but nothing has been added yet.
        noIntegrationSetupToSet = true;
      }
    }

    // setIntegrationId(integrationIdToSet);
    setRequiresIntegrationIdSelection(requiresIntegrationIdSelectionToSet);

    onChange({
      integrationId: integrationIdToSet,
      integrationSlug: slug,
      noIntegrationSetup: noIntegrationSetupToSet,
      requiresIntegrationIdSelection: requiresIntegrationIdSelectionToSet
    });
  };
  const onIntegrationChangeHandler = (iId: any) => {
    logger.debug('<IntegrationSelect /> change', { integrationId: iId });
    // setIntegrationId(iId.value);

    onChange({
      integrationId: iId.value,
      integrationSlug: systemIntegrationSlug,
      noIntegrationSetup: false,
      requiresIntegrationIdSelection
    });
  };

  const options = Object.values(store.integrations)
    .filter(i => i.slug === systemIntegrationSlug)
    .map((i: Integration) => {
      return {
        value: i.id,
        label: i.config.name
      };
    });

  // TODO - clean up. Many nested ifs here
  let integrationSelectCmp = null;
  if (systemIntegrationSlug) {
    const systemIntegration = store.systemIntegrations[systemIntegrationSlug];
    if (!systemIntegration) {
      logger.error('Cannot find integration for slug', { systemIntegrationSlug });
    } else {
      if (!options.length) {
        integrationSelectCmp = (
          <p className="my-4">
            You need to add some settings.{' '}
            <Link href={`/settings/integrations/${systemIntegrationSlug}/new`}>
              <a className="text-blue mb-4">You can do this here.</a>
            </Link>
          </p>
        );
      } else if (systemIntegration.requiresSettings && !systemIntegration.singular) {
        // Only show integrationSelect if we are required to enter settings for it and it's not singular
        integrationSelectCmp = (
          <>
            <Label className="mt-4">Which one?</Label>
            <Select
              onChange={onIntegrationChangeHandler}
              className={cn(className, 'react-select-container')}
              classNamePrefix="react-select"
              options={options}
            />
          </>
        );
      }
    }
  }

  return (
    <div className={className}>
      <SystemIntegrationSelect onChange={onSystemIntegrationChangeHandler} />
      {integrationSelectCmp}
    </div>
  );
});

export default IntegrationSelect;
