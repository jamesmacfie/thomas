import React from 'react';
import moment from 'moment';
import Panel, { Props as PanelProps } from 'components/panel';
import { H3, H4 } from 'components/text';

interface Props {
  title?: string;
  start?: Date | string;
  panelProps?: PanelProps;
}

const NextMeeting = ({ title, start, panelProps = {} }: Props) => {
  console.log(start);
  if (!moment(start).isValid()) {
    return (
      <Panel {...panelProps} label="Up next">
        <div className="w-full">
          <H3 className="mt-2 truncate">{title}</H3>
        </div>
      </Panel>
    );
  }

  return (
    <Panel {...panelProps} label="Up next">
      <div className="w-full">
        <H4 className="mt-2 truncate">{title}</H4>
        <H3>{start ? moment(start).fromNow() : '--'}</H3>
      </div>
    </Panel>
  );
};

export default NextMeeting;
