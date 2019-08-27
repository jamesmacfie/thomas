import React, { ElementType, useContext } from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import GoogleStore, { StoreContext } from '../store';
import { useFetch } from 'hooks/useFetch';
import Button from 'components/button';
import { H2 } from 'components/text';
import GoogleIntegrationsWrapper from '../components/integrationsWrapper';

const Create = () => {
  const [data, loading] = useFetch('/google/login_url');

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <Button type="primary" padding={false}>
      <Link href={data.url}>
        <a className="px-6 py-2 inline-block">Link Google account</a>
      </Link>
    </Button>
  );
};

const List = observer(() => {
  const store = useContext(StoreContext) as GoogleStore;

  if (!store.integrations) {
    return <Create />;
  }

  return (
    <>
      {store.integrations.map(i => {
        return <p key={i.id}>{i.id}</p>;
      })}
      <Create />
    </>
  );
});

const Inner = () => {
  return (
    <GoogleIntegrationsWrapper>
      <H2 className="mt-0">
        <Link href="/settings">
          <a>Settings</a>
        </Link>
        {' > '}
        <Link href="/settings/integrations">
          <a>Integrations</a>
        </Link>
        {' > '}Google
      </H2>
      <List />
    </GoogleIntegrationsWrapper>
  );
};

const cmp = (): ElementType => {
  return Inner;
};

export default cmp;
