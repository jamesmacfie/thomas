import React from 'react';
import IntegrationConfigForm from '../integrationConfigForm';

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
      <IntegrationConfigForm
        integration={integration}
        allIntegrations={integrations}
        config={systemIntegration.settings}
      />
    );
  }
  return <p>More than one integration. Todo</p>;
};

export default IntegrationSettings;
