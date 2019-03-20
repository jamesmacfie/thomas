import React, { Component } from 'react';
import Navigation from '../../components/navigation';
import PageWrapper from '../../components/pageWrapper';

export default class Settings extends Component {
  render() {
    return (
      <PageWrapper title="Settings">
        <div className="flex">
          <Navigation />
          <div>
            <p>Settings page!</p>
          </div>
        </div>
      </PageWrapper>
    );
  }
}
