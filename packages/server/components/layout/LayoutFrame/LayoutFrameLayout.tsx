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
  let {showHeader, showFooter, header, footer} = useLayoutFrame();
  header = header
  footer = footer
  if (typeof showHeader !== 'boolean') {
    showHeader = Boolean(header)
  }
  if (typeof showFooter !== 'boolean') {
    showFooter = Boolean(footer)
  }
  return (
    <Layout style={{height: '100%'}}>
      {header && showHeader && (
        <Layout.Header>
          {header}
        </Layout.Header>
      )}
      <Layout hasSider>

        <LayoutFrameSider />

          <Layout>
            <Layout.Content style={{maxHeight: '100%', overflowY: 'auto'}}>

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

