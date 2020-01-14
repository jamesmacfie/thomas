import React, { useState } from 'react';
import Panel from 'components/panel';
import { Redirect } from 'react-router-dom';
import Form from 'containers/addNewDeviceViewModal/form';

const AddFirstView = () => {
  const [redirectViewId, setRedirectViewIe] = useState<any>(null);
  if (redirectViewId !== null) {
    return <Redirect to={`/p/${redirectViewId}`} />;
  }

  return (
    <div className="w-128 h-128 relative absolute-center">
      <Panel>
        <p className="text-5xl text-center">🎉</p>
        <p className="mb-4 text-center">Let's create the first view.</p>
        <Form
          onClose={(deviceView: any) => {
            setRedirectViewIe(deviceView.viewId);
          }}
        />
      </Panel>
    </div>
  );
};

export default AddFirstView;
