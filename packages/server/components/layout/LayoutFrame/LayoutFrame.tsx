import React from 'react'
import {MenuSpec} from 'components/layout/LayoutFrame/types';
import {LayoutFrameLayout} from 'components/layout/LayoutFrame/LayoutFrameLayout';
import {LayoutFrameContext} from 'components/layout/LayoutFrame/hooks';

export interface LayoutFrameProps {
  menus: MenuSpec[]
  showFooter?: boolean
  showHeader?: boolean

  footer?: React.ReactNode
  header?: React.ReactNode

  link?: ({href}) => React.ReactNode
}


export const LayoutFrame: React.FC<LayoutFrameProps> = (props) => {
  const {children, showFooter, showHeader, footer, header} = props;
  // let {layout} = props;
  //
  // layout = useMemo(() => {
  //   if (!layout) {
  //     return {} as any
  //   }
  //   return layout
  // }, []);

  return (
    <LayoutFrameContext.Provider value={props}>
      <LayoutFrameLayout {...{children, showFooter, showHeader, footer, header}} />
    </LayoutFrameContext.Provider>
  )
};

