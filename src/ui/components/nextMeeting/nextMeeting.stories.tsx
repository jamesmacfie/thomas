import React from 'react';
import faker from 'faker';
import NextMeeting from '.';

export default {
  title: 'Next Meeting',
  component: NextMeeting
};

export const Default = () => {
  const title = faker.random.words();
  const start = faker.date.future();

  return (
    <div className="h-32 w-64">
      <NextMeeting title={title} start={start} />
    </div>
  );
};

Default.story = {
  name: 'Default'
};
