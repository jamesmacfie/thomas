import React from 'react';
import Panel from 'components/panel';
import Form from './form';

const AddFirstDevice = () => {
  return (
    <div className="w-128 h-128 relative absolute-center">
      <Panel>
        <p className="text-5xl text-center">👋</p>
        <p className="mb-4 text-center">
          Looks like this is the first time you've set this up.
          <br />
          Enter a name for this device (like lounge, bedroom or something) and an icon.
        </p>
        <Form onClose={() => {}} />
      </Panel>
    </div>
  );
};

export default AddFirstDevice;
