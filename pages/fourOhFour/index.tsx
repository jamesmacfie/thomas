import React from 'react';
import Panel from 'components/panel';

const Home = () => {
  return (
    <div className="w-128 h-128 relative absolute-center">
      <Panel>
        <p className="text-5xl text-center">😭</p>
        <p className="mb-4 text-center">Page not found</p>
      </Panel>
    </div>
  );
};

export default Home;
