import React, { Component } from 'react';
import PageWrapper from '../../components/pageWrapper';
import SubNavigation from '../../components/settingsSubNavigation';
import HomeAssistantAccountPanel from '../../components/homeAssistantAccountPanel';
import GoogleAccountPanel from '../../components/googleAccountPanel';
import SpotifyAccountPanel from '../../components/spotifyAccountPanel';
import { H2 } from '../../components/text';

export default class Settings extends Component {
  render() {
    return (
      <PageWrapper title="Settings">
        <div className="flex h-full">
          <SubNavigation />
          <div className="p-6">
            <H2 className="mt-0">Accounts</H2>
            <div className="flex mb-6">
              <HomeAssistantAccountPanel className="mr-6" />
              <GoogleAccountPanel />
            </div>
            <div>
              <SpotifyAccountPanel />
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }
}
