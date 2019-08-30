import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import DarkSkyStore, { StoreContext } from '../store';
import IntegrationsStore, { StoreContext as IntegrationStoreContext } from 'stores/integrations';
import Loader from 'components/loader';
import Label from 'components/label';
import Input from 'components/input';
import Button from 'components/button';
import { H2 } from 'components/text';
import DarkSkyIntegrationsWrapper from '../components/integrationsWrapper';

interface CreateUpdateProps {
  onClick: () => void;
  integrationCount: number;
  submitting: boolean;
}

interface FormProps {
  onSubmit: (apiKey: string, longitude: string, latitude: string) => void;
  integrationCount: number;
  submitting: boolean;
  initialConfig?: any;
}

const CreateUpdate = ({ integrationCount, onClick, submitting }: CreateUpdateProps) => {
  const text = integrationCount > 0 ? 'Update' : 'Set';
  return (
    <Button type="primary" padding={false} onClick={onClick} disabled={submitting}>
      <span className="px-6 py-2 inline-block">{text}</span>
    </Button>
  );
};

const Form = ({ initialConfig = {}, onSubmit, submitting, integrationCount }: FormProps) => {
  const [apiKey, setApiKey] = useState(initialConfig.apiKey || '');
  const [longitude, setLongitude] = useState(initialConfig.longitude || '');
  const [latitude, setLatitude] = useState(initialConfig.latitude || '');
  const submit = () => {
    onSubmit(apiKey, longitude, latitude);
  };
  return (
    <>
      <div className="mb-4">
        <Label>Darksky API Key</Label>
        <Input
          className="block mb-4 w-96"
          value={apiKey}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setApiKey(e.target.value);
          }}
        />
      </div>
      <div className="mb-4">
        <Label>Longitude</Label>
        <Input
          className="block mb-4 w-96"
          value={longitude}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLongitude(e.target.value);
          }}
        />
      </div>
      <div className="mb-4">
        <Label>Latitude</Label>
        <Input
          className="block mb-4 w-96"
          value={latitude}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLatitude(e.target.value);
          }}
        />
      </div>
      <CreateUpdate onClick={submit} submitting={submitting} integrationCount={integrationCount} />
    </>
  );
};

const List = observer(() => {
  const [submitting, setSubmitting] = useState(false);
  const store = useContext(StoreContext) as DarkSkyStore;
  const integrationstore = useContext(IntegrationStoreContext) as IntegrationsStore;

  const updateKey = async (apiKey: string, longitude: string, latitude: string) => {
    if (!apiKey.length || !longitude.length || !latitude.length) {
      return;
    }

    const config = { apiKey, longitude, latitude };

    setSubmitting(true);
    if (!store.integrations!.length) {
      await integrationstore.saveNewIntegration('darksky', config);
    } else {
      await integrationstore.updateExistingIntegration(store.integrations![0].id, config);
    }
    await store.getIntegrations();
    setSubmitting(false);
  };

  if (store.integrations === null) {
    store.getIntegrations();
    return <Loader fullPage />;
  }

  const initialConfig = store.integrations.length ? store.integrations[0].config : null;

  return (
    <>
      <Form
        initialConfig={initialConfig}
        onSubmit={updateKey}
        submitting={submitting}
        integrationCount={store.integrations.length}
      />
    </>
  );
});

const Settings = () => {
  console.log('settings');
  return (
    <DarkSkyIntegrationsWrapper>
      <H2 className="mt-0">
        <Link href="/settings">
          <a>Settings</a>
        </Link>
        {' > '}
        <Link href="/settings/integrations">
          <a>Integrations</a>
        </Link>
        {' > '}Dark Sky
      </H2>
      <List />
    </DarkSkyIntegrationsWrapper>
  );
};

export default Settings;
