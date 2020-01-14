import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PageWrapper from 'containers/wrappers/page';
import PanelIcon from 'components/panelIcon';
import { H2 } from 'components/text';
import FourOhFour from '../../pages/fourOhFour';
import DeveloperSettings from './developer';
import IntegrationsSettings from './integrations';
import IntegrationSettings from './integrations/integration';
import NewIntegrationSettings from './integrations/new';
import ExistingIntegrationSettings from './integrations/existing';
import ChildIntegrationSettings from './integrations/child';

interface Props {
  url: string;
  text: string;
  icon: string;
}

const settingsList = [
  {
    url: '/settings/integrations',
    text: 'Integrations',
    icon: 'project-diagram'
  },
  {
    url: '/settings/developer',
    text: 'Developer',
    icon: 'laptop'
  }
];

const Setting = ({ url, text, icon }: Props) => (
  <div className="w-40 h-40 mr-6 text-center">
    <PanelIcon href={url} title={text} icon={icon} />
  </div>
);

const Index = () => {
  return (
    <>
      <H2 className="mt-0">Settings</H2>
      <div className="flex">
        {settingsList.map(s => (
          <Setting key={s.url} {...s} />
        ))}
      </div>
    </>
  );
};

const Settings = () => {
  let { url } = useRouteMatch();
  return (
    <PageWrapper title="Settings">
      <Switch>
        <Route exact path={`${url}`}>
          <Index />
        </Route>
        <Route path={`${url}/developer`}>
          <DeveloperSettings />
        </Route>
        <Route exact path={`${url}/integrations`}>
          <IntegrationsSettings />
        </Route>
        <Route exact path={`${url}/integrations/:slug`}>
          <IntegrationSettings />
        </Route>
        <Route exact path={`${url}/integrations/:slug/new`}>
          <NewIntegrationSettings />
        </Route>
        <Route exact path={`${url}/integrations/:slug/existing/:id`}>
          <ExistingIntegrationSettings />
        </Route>
        <Route path={`${url}/integrations/:slug/:child`}>
          <ChildIntegrationSettings />
        </Route>
        <Route path="*">
          <FourOhFour />
        </Route>
      </Switch>
    </PageWrapper>
  );
};

export default Settings;
