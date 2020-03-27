import centered from '@storybook/addon-centered/react';
import React from 'react';
import { BoxShuffle } from 'src/loaders/BoxShuffle';

export default {
  title: 'loader/spinner/BoxShuffle',
  component: BoxShuffle,
  decorators: [
    (storyFn) => (
      <div style={{ backgroundColor: '#455a64', height: 400, width: 300, position: 'relative' }}>
        <div style={{ textAlign: 'center', position: 'absolute', top: 50, left: 0, right: 0 }}>
          <a href="https://codepen.io/golle404/pen/EKOoyW" target="_blank" rel="noreferrer noopener">
            CodePen
          </a>
        </div>
        <div>{storyFn()}</div>
      </div>
    ),
    centered
  ]
};

export const BasicBoxShuffle = BoxShuffle;
