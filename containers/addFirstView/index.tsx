import React from 'react';
import Panel from 'components/panel';
import Router from 'next/router';
import Form from 'containers/addNewDeviceViewModal/form';

const AddFirstView = () => {
  return (
    <div className="w-128 h-128 relative absolute-center">
      <Panel>
        <p className="text-5xl text-center">🎉</p>
        <p className="mb-4 text-center">Let's create the first view.</p>
        <Form
          onClose={deviceView => {
            Router.push(`/p/${deviceView.viewId}`);
          }}
        />
      </Panel>
    </div>
  );
};

export default AddFirstView;
