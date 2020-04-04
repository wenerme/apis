import centered from '@storybook/addon-centered/react';
import React from 'react';
import { GooeyLoader } from './GooeyLoader';

export default {
  title: 'loader/spinner/GooeyLoader',
  component: GooeyLoader,
  decorators: [
    (storyFn) => (
      <div style={{ backgroundColor: '#f8f4d5', height: 400, width: 300, position: 'relative' }}>
        <div style={{ textAlign: 'center', position: 'absolute', top: 50, left: 0, right: 0 }}>
          <a href="https://codepen.io/Izumenko/pen/MpWyXK" target="_blank" rel="noreferrer noopener">
            CodePen
          </a>
        </div>
        <div>{storyFn()}</div>
      </div>
    ),
    centered,
  ],
};

export const BasicGooeyLoader = GooeyLoader;
