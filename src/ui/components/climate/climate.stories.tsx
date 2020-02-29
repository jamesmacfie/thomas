import React from 'react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Climate from '.';

export default {
  title: 'Climate',
  component: Climate
};

export const Default = () => {
  const props = {
    isActive: boolean('Is active', false),
    minTemp: text('Min temp', '10'),
    maxTemp: text('Max temp', '30'),
    targetTemp: text('Target temp', '16'),
    onToggle: action('toggle'),
    setTarget: action('target'),
    label: text('Label', 'a/c')
  };
  return (
    <div className="h-96 w-96">
      <Climate {...props} />
    </div>
  );
};

Default.story = {
  name: 'Default'
};
