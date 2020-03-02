import React from 'react';
import { addDecorator } from '@storybook/react';
import { Inner as Theme } from 'containers/wrappers/theme';
import fontawesome from '@fortawesome/fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import '../src/ui/styles/dist.css';
import './styles.css';

fontawesome.library.add(fab, fas, far);

addDecorator(storyFn => (
  <div style={{ padding: '20px' }}>
    <Theme theme="dark">{storyFn()}</Theme>
  </div>
));
