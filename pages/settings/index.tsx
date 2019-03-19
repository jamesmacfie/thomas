import React, { Component } from 'react';
import Button from '../../components/button';
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
            <Button />
          </div>
        </div>
      </PageWrapper>
    );
  }
}
