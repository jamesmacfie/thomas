import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import PageWrapper from 'containers/pageWrapper';
import IntegrationsStore, { StoreContext } from 'stores/integrations';
import Loader from 'components/loader';
import PanelIcon from 'components/panelIcon';
import { H2 } from 'components/text';

const Integrations = observer(() => {
  const store = useContext(StoreContext) as IntegrationsStore;
  if (!store.integrations || !store.systemIntegrations) {
    return <Loader fullPage />;
  }
  return (
    <PageWrapper title="Settings - Integrations">
      <H2 className="mt-0">
        <Link href="/settings">
          <a>Settings</a>
        </Link>
        {' > '}Integrations
      </H2>
      <div className="flex">
        {Object.values(store.systemIntegrations).map((i: any) => (
          <PanelIcon
            title={i.name}
            href={`/settings/integrations/${i.slug}`}
            imgSrc={`/static/${i.slug}/logo.png`}
            imageClassName="rounded-full bg-white"
          />
        ))}
      </div>
    </PageWrapper>
  );
});

export default Integrations;
