import React from 'react';
import Panel from '../panel';
import './styles.css';

const Loader = () => (
  <div className="loader">
    <div />
    <div />
  </div>
);

export default Loader;

export const PageLoader = () => (
  <div className="relative h-screen w-screen">
    <Panel fit={false} className="absolute pin-center">
      <Loader />
    </Panel>
  </div>
);
