import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from './index';

export default {
  title: 'Button',
  component: Button
};

export const Simple = () => (
  <Button color="primary" onClick={action('clicked')}>
    Hello!
  </Button>
);

Simple.story = {
  name: 'Simple button'
};
