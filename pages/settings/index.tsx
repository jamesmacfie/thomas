import React, { Component } from 'react';
import PageWrapper from '../../components/pageWrapper';
import SubNavigation from '../../components/settingsSubNavigation';

export default class Settings extends Component {
  render() {
    return (
      <PageWrapper title="Settings">
        <div className="flex h-full">
          <SubNavigation />
          <div>
            <p>Settings page!</p>
          </div>
        </div>
      </PageWrapper>
    );
  }
}
