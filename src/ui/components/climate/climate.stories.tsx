import React, { useState } from 'react';
import { boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Climate from '.';

export default {
  title: 'Climate',
  component: Climate
};

export const Default = () => {
  const [mode, setMode] = useState('auto');
  const props = {
    isActive: boolean('Is active', false),
    minTemp: number('Min temp', 10),
    maxTemp: number('Max temp', 30),
    targetTemp: number('Target temp', 16),
    onToggle: action('toggle'),
    setTarget: action('target')
  };
  return (
    <div className="h-96 w-96">
      <Climate {...props} fanMode={mode} setFanMode={setMode} panelProps={{ label: 'here' }} />
    </div>
  );
};

Default.story = {
  name: 'Default'
};
