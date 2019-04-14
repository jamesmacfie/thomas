import React from 'react';
import cn from 'classnames';
import Panel from '../panel';
import './styles.css';

const Loader = ({ className }: { className?: string }) => (
  <div className={cn(className, 'loader')}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
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
