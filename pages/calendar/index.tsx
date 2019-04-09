import React, { Component } from 'react';
import PageWrapper from '../../components/pageWrapper';
import GoogleCalendar from '../../components/googleCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default class Calendar extends Component {
  render() {
    return (
      <PageWrapper title="Settings">
        <div className="flex full">
          <GoogleCalendar />
        </div>
      </PageWrapper>
    );
  }
}
