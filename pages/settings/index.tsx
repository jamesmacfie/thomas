import React, { Component } from 'react';
import PageWrapper from '../../components/pageWrapper';

export default class Settings extends Component {
  render() {
    return (
      <PageWrapper title="Settings">
        <div className="flex">
          <div>
            <p>Settings page!</p>
          </div>
        </div>
      </PageWrapper>
    );
  }
}
