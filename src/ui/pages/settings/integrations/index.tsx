import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import IntegrationsStore, { StoreContext } from 'stores/integrations';
import PanelIcon from 'components/panelIcon';
import { H2 } from 'components/text';
import Integration from './integration';

const api_url = process.env.REACT_APP_API_URL;

const Index = observer(() => {
  const store = useContext(StoreContext) as IntegrationsStore;

  return (
    <>
      <H2 className="mt-0">
        <Link to="/settings">Settings</Link>
        {' > '}Integrations
      </H2>
      <div className="flex">
        {Object.values(store.systemIntegrations!)
          .filter((i: SystemIntegration) => i.requiresSettings)
          .map((i: SystemIntegration) => (
            <PanelIcon
              title={i.name}
              href={`/settings/integrations/${i.slug}`}
              imgSrc={`${api_url}/api/static/${i.slug}/logo.png`}
              imageClassName="rounded-full bg-white"
            />
          ))}
      </div>
    </>
  );
});

const Integrations = observer(() => {
  let { url } = useRouteMatch();
  const store = useContext(StoreContext) as IntegrationsStore;
  if (!store.loaded) {
    return null;
  }

  return (
    <>
      <Switch>
        <Route path={`${url}/:slug`}>
          <Integration />
        </Route>
        <Route path="*">
          <Index />
        </Route>
      </Switch>
    </>
  );
});

export default Integrations;
