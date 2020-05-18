import React from 'react';
import { Button } from 'antd';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Demo/Button',
  component: Button,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: { onClick: { action: 'clicked' } },
  decorators: [(storyFn) => <div style={{ backgroundColor: 'gray', padding: 100 }}>{storyFn()}</div>],
};

export const helloAntdButton = ({ onClick }) => (
  <Button onDoubleClick={action('double-click')} onClick={onClick} type="primary">
    Hello
  </Button>
);

export const helloNativeButton = ({ onClick }) => (
  <button onDoubleClick={action('double-click')} onClick={onClick}>
    Hello
  </button>
);
