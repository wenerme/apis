import { ComponentType } from 'react';

export type LazyComponentType = Promise<{ default: ComponentType }>;
