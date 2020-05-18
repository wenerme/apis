import React from 'react';
import { BoxShuffle } from './BoxShuffle';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'loader/spinner/BoxShuffle',
  component: BoxShuffle,
  decorators: [
    (storyFn) => (
      <div style={{ backgroundColor: 'white', height: 400, width: 300, position: 'relative' }}>
        <div style={{ textAlign: 'center', position: 'absolute', top: 50, left: 0, right: 0 }}>
          <a href="https://codepen.io/golle404/pen/EKOoyW" target="_blank" rel="noreferrer noopener">
            CodePen
          </a>
        </div>
        <div>{storyFn()}</div>
      </div>
    ),
  ],
};

export const BasicBoxShuffle = BoxShuffle;
export const TitledBoxShuffle = () => {
  return <BoxShuffle title={text('Title', 'Loadding...')} detail={text('Detail', 'src/test/Component.tsx')} />;
};
