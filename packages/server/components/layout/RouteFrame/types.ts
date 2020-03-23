import { ComponentClass, FunctionComponent } from 'react';

export interface RouteSpec {
  component: FunctionComponent | ComponentClass;
  children?: RouteSpec[];

  layout?: FunctionComponent | ComponentClass;

  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
}
