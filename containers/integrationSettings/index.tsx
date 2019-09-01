import React from 'react';
import ConfigForm from '../configForm';

interface Props {
  systemIntegration: any;
  integrations: any[];
}

const IntegrationSettings = ({ systemIntegration, integrations }: Props) => {
  if (systemIntegration.singular) {
    return <ConfigForm integration={integrations[0]} config={systemIntegration.settings} />;
  }
  return <p>More than one integration.</p>;
};

export default IntegrationSettings;
