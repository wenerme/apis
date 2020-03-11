import React from 'react'

import {Layout} from 'antd';
import {MenuSpec} from 'components/layout/LayoutFrame/types';
import {LayoutFrameSider} from 'components/layout/LayoutFrame/LayoutFrameSider';
import {useLayoutFrame} from 'components/layout/LayoutFrame/hooks';

export interface LayoutFrameLayoutProps {
  menus: MenuSpec[]

  showHeader?: boolean
  showFooter?: boolean

  footer?: React.ReactNode
  header?: React.ReactNode
}


export const LayoutFrameLayout: React.FC = ({children}) => {
    const {showHeader, showFooter, header, footer} = useLayoutFrame();

    return (
      <Layout>
        {header && showHeader && (
          <Layout.Header>
            {header}
          </Layout.Header>
        )}
        <Layout hasSider>

          <LayoutFrameSider />

          <Layout>
            <Layout.Content style={{maxHeight: '100vh'}}>

              {children}

            </Layout.Content>

            {footer && showFooter && (
              <Layout.Footer>
                {footer}
              </Layout.Footer>
            )}
          </Layout>
        </Layout>
      </Layout>
    )
  }
;

