import React, {ComponentClass, FunctionComponent} from 'react';

export interface MenuSpec {
  title
  iconType?
  iconComponent?: React.ReactNode
  path?: string
  route?: string
  routes?: string[]


  component?: FunctionComponent | ComponentClass

  children?: MenuSpec[]
}
