import React from 'react';
import Link from 'next/link';
import IntegrationConfigForm from '../integrationConfigForm';
import { H2 } from 'components/text';

interface Props {
  systemIntegration: any;
  integrations: any[];
}

const IntegrationSettings = ({ systemIntegration, integrations }: Props) => {
  if (systemIntegration.singular) {
    let integration = {};
    if (integrations[0]) {
      integration = integrations[0];
    }
    return (
      <>
        <H2 className="mt-0">
          <Link href="/settings">
            <a>Settings</a>
          </Link>
          {' > '}
          <Link href="/settings/integrations">
            <a>Integrations</a>
          </Link>
          {' > '}
          {systemIntegration.name}
        </H2>
        <IntegrationConfigForm
          integration={integration}
          allIntegrations={integrations}
          config={systemIntegration.settings}
        />
      </>
    );
  }
  return <p>More than one integration. Todo</p>;
};

export default IntegrationSettings;
