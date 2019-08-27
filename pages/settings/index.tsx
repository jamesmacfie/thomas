import React from 'react';
import PageWrapper from 'containers/pageWrapper';
import PanelIcon from 'components/panelIcon';
import { H2 } from 'components/text';

interface Props {
  url: string;
  text: string;
}

const settingsList = [
  {
    url: '/settings/integrations',
    text: 'Integrations'
  }
];

const Setting = ({ url, text }: Props) => (
  <div className="w-40 h-40 text-center">
    <PanelIcon href={url} title={text} icon="dashboard" />
  </div>
);

const Settings = () => {
  return (
    <PageWrapper title="Settings">
      <H2 className="mt-0">Settings</H2>
      {settingsList.map(s => (
        <Setting key={s.url} {...s} />
      ))}
    </PageWrapper>
  );
};

export default Settings;
