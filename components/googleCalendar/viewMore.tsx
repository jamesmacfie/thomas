import React from 'react';
import moment from 'moment';
import Modal from '../modal';
import { H2, H3 } from '../text';
import { getImageUrl } from './hero';
import { MushEvent } from '.';

interface Props {
  event: MushEvent;
  onClick: () => void;
}

const GoogleCalendarViewMore = ({ event, onClick }: Props) => {
  const dateString = event.allDay
    ? moment(event.start!).format('dddd, MMMM Do')
    : `${moment(event.start!).format('dddd, MMMM Do hh:mm')} - ${moment(event.end!).format('hh:mm')}`;
  const imageUrl = getImageUrl(event.title || '');

  return (
    <Modal onClick={onClick} size="md" padding={false}>
      {imageUrl && <img src={imageUrl} className="calendar-hero" />}
      <div className="p-6">
        <H2 className="mt-0">{event.title}</H2>
        <H3>{dateString}</H3>
        {event.event.description && <p>event.event.description</p>}
      </div>
    </Modal>
  );
};

export default GoogleCalendarViewMore;
