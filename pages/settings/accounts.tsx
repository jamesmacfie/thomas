import React, { Component } from 'react';
import PageWrapper from '../../components/pageWrapper';
import SubNavigation from '../../components/settingsSubNavigation';
import HomeAssistantAccountPanel from '../../components/homeAssistantAccountPanel';
import GoogleAccountPanel from '../../components/googleAccountPanel';
import { H1 } from '../../components/text';

export default class Settings extends Component {
  render() {
    return (
      <PageWrapper title="Settings">
        <div className="flex h-full">
          <SubNavigation />
          <div className="p-6">
            <H1 className="mt-0">Accounts</H1>
            <div>
              <HomeAssistantAccountPanel />
              <GoogleAccountPanel />
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }
}