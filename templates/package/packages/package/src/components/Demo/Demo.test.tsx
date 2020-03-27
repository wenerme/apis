import React from 'react';

import renderer, { act } from 'react-test-renderer';
import { Demo } from 'src/components/Demo/Demo';

test('Demo component test', async () => {
  const component = renderer.create(<Demo title="Title">content</Demo>);

  let tree = component.toJSON() as any;
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  act(() => tree.children.find(v => v.type === 'h2').props.onMouseEnter());
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  act(() => tree.children.find(v => v.type === 'h2').props.onMouseLeave());
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
