import React from 'react';
import centered from '@storybook/addon-centered/react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { DynamicIcon } from './DynamicIcon';

import IconManifest from './manifest.json';
import styled from 'styled-components';

export default {
  title: 'icons/DynamicIcon',
  component: DynamicIcon,
  decorators: [
    withKnobs,
    (storyFn) => <div style={{ backgroundColor: 'white', padding: 100 }}>{storyFn()}</div>,
    centered,
    withKnobs,
  ],
};

export const dynamicLoadWithSpin = () => <DynamicIcon style={{ fontSize: 32 }} type={'BarcodePrintOutlined'} spin />;
export const dynamicLoadManifest = () => {
  return (
    <DynamicIcon
      style={{ fontSize: 32 }}
      type={select(
        'type',
        IconManifest.map((v) => v.name),
        'BarcodePrintOutlined',
      )}
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
  return (
    <IconsContainer>
      {IconManifest.map((v) => v.name).map((v) => (
        <figure key={v}>
          <DynamicIcon type={v} style={{ fontSize: 32 }} />
          <figcaption>{v}</figcaption>
        </figure>
      ))}
    </IconsContainer>
  );
};
