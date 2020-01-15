import React from 'react';
import moment from 'moment';
import Loader from 'components/loader';
import Panel from 'components/panel';
import { H3, H4 } from 'components/text';
import { useNextCalendarEvent } from '../store/hooks';

const Next = ({ integrationId, widgetConfig }: IntegrationWidgetProps) => {
  const [event, loading] = useNextCalendarEvent(integrationId);

  if (loading) {
    return <Loader />;
  }

  if (event === null) {
    return (
      <Panel {...widgetConfig} label="Next meeting">
        <H3>Nothing!</H3>
      </Panel>
    );
  }

  return (
    <Panel {...widgetConfig} label="Next meeting">
      <div>
        <H3>{event.summary}</H3>
        <H4>{moment(event.start?.dateTime).fromNow()}</H4>
      </div>
    </Panel>
  );
};

export default Next;
