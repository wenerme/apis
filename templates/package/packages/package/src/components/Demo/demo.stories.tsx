import React from 'react';
import { Demo } from 'src/components/Demo/Demo';
import centered from '@storybook/addon-centered/react';
import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Demo/Demo',
  component: Demo,
  decorators: [withKnobs, storyFn => <div style={{ backgroundColor: 'gray', padding: 100 }}>{storyFn()}</div>, centered]
};

/// Demo with event
export const basicDemo = () => <Demo onClick={action('click demo')}>Hello</Demo>;

export const titledDemo = () => <Demo title={text('Title', 'Main')}>{text('Content', 'Hello there')}</Demo>;
export const nestedDemo = () => (
  <Demo title={text('Title', 'Main')}>
    <Demo title={text('Child Title', 'Sub')}>{text('Content', 'Hello there')}</Demo>
  </Demo>
);
