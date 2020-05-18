import React from 'react';
import { boolean, color, number, select } from '@storybook/addon-knobs';
import { DynamicIcon } from './DynamicIcon';
import LazyLoad from 'react-lazyload';

import styled from 'styled-components';
import { antdIconsDynamicResolver } from './antdIconsDynamicResolver';
import { antdIconsResolverTypes } from './antdIconsResolverTypes';
import { iconsResolverTypes } from './iconsResolverTypes';
import { iconsResolver } from './iconsResolver';

export default {
  title: 'icons/DynamicIcon',
  component: DynamicIcon,
  decorators: [(storyFn) => <div style={{ backgroundColor: 'white', padding: 100 }}>{storyFn()}</div>],
};

DynamicIcon.resolvers.push(iconsResolver, antdIconsDynamicResolver);

export const dynamicLoadWithSpin = () => <DynamicIcon style={{ fontSize: 32 }} type={'BarcodePrintOutlined'} spin />;
export const dynamicLoadManifest = () => {
  return (
    <DynamicIcon
      style={{ fontSize: 32 }}
      type={select('type', iconsResolverTypes, 'BarcodePrintOutlined')}
      spin={boolean('spin', false)}
    />
  );
};

const IconsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  figure {
    display: flex;
    align-items: center;
    flex-flow: column;
    figcaption {
      font-size: 0.8rem;
      color: grey;
    }
  }
`;
export const dynamicLoadAll = () => {
  const fontColor = color('color', '#F4511E');
  const fontSize = number('size', 32, { range: true, max: 64, step: 1, min: 16 });
  return (
    <IconsContainer style={{ color: fontColor }}>
      {iconsResolverTypes.map((v) => (
        <figure key={v}>
          <DynamicIcon type={v} style={{ fontSize }} />
          <figcaption>{v}</figcaption>
        </figure>
      ))}
    </IconsContainer>
  );
};

export const antdAll = () => {
  const fontColor = color('color', '#F4511E');
  const fontSize = number('size', 32, { range: true, max: 64, step: 1, min: 16 });
  return (
    <IconsContainer style={{ color: fontColor }}>
      {antdIconsResolverTypes.map((v) => (
        <figure key={v}>
          <LazyLoad overflow height={64} scrollContainer={document.querySelector('#root > div > div') || undefined}>
            <DynamicIcon type={v} style={{ fontSize }} />
          </LazyLoad>
          <figcaption>{v}</figcaption>
        </figure>
      ))}
    </IconsContainer>
  );
};
