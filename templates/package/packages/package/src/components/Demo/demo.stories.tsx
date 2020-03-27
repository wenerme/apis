import React from 'react';
import { Demo } from 'src/components/Demo/Demo';
import centered from '@storybook/addon-centered/react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Demo/Demo',
  component: Demo,
  decorators: [storyFn => <div style={{ backgroundColor: 'gray', padding: 100 }}>{storyFn()}</div>, centered]
};

/// Demo with event
export const basicDemo = () => <Demo onClick={action('click demo')}>Hello</Demo>;

export const titledDemo = () => <Demo title="Title">Hello</Demo>;
export const nestedDemo = () => (
  <Demo title="Title">
    <Demo title="Child">Hello child</Demo>
  </Demo>
);
