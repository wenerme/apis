import React from 'react';
import centered from '@storybook/addon-centered/react';
import { GradientSpinner, PlantRotating, PulseBubble, SolarSystemSpinner } from './AlexWarnesCssLoader';

export default {
  title: 'loader/spinner/AlexWarnesCssLoader',
  component: GradientSpinner,
  argTypes: { onClick: { action: 'clicked' } },
  decorators: [
    (storyFn) => (
      <div style={{ backgroundColor: '#37474f', padding: 100 }}>
        <div>{storyFn()}</div>
        <div style={{ textAlign: 'center' }}>
          <a href="https://codepen.io/AlexWarnes/pen/jXYYKL" target="_blank" rel="noreferrer noopener">
            AlexWarnes CSS Loading Animations CodePen
          </a>
        </div>
      </div>
    ),
    centered,
  ],
};

// https://codepen.io/AlexWarnes/pen/jXYYKL

export const BasicGradientSpinner = GradientSpinner;
export const BasicPulseBubble = PulseBubble;
export const BasicSolarSystemSpinner = SolarSystemSpinner;
export const BasicPlantRotating = PlantRotating;
