import React from 'react';
import { addDecorator } from '@storybook/react';
import { Inner as Theme } from 'containers/wrappers/theme';
import '../src/ui/styles/dist.css';
import './styles.css';

addDecorator(storyFn => (
  <div style={{ padding: '20px' }}>
    <Theme theme="dark">{storyFn()}</Theme>
  </div>
));
