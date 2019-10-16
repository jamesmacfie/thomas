import React from 'react';
import PageWrapper from 'containers/wrappers/page';
import PanelIcon from 'components/panelIcon';
import { H2 } from 'components/text';

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

const Settings = () => {
  return (
    <PageWrapper title="Settings">
      <H2 className="mt-0">Settings</H2>
      <div className="flex">
        {settingsList.map(s => (
          <Setting key={s.url} {...s} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Settings;
