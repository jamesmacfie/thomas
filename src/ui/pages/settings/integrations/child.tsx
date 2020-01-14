import React from 'react';
import { useParams } from 'react-router-dom';
import { useLoaded } from 'stores/integrations/hooks';
import integrationSettings from 'thomas/integrationSettings';

const IntegrationSettingsChild = () => {
  const loaded = useLoaded();
  const { slug, child } = useParams();
  if (!loaded) {
    return null;
  }

  const Cmp = integrationSettings(`${slug}_${child}`);
  return <Cmp />;
};

export default IntegrationSettingsChild;
