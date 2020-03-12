import React from 'react'

import {Layout} from 'antd';
import {MenuSpec} from 'components/layout/LayoutFrame/types';
import {LayoutFrameSider} from 'components/layout/LayoutFrame/LayoutFrameSider';

export interface LayoutFrameLayoutProps {
  menus: MenuSpec[]

  showHeader?: boolean
  showFooter?: boolean

  footer?: React.ReactNode
  header?: React.ReactNode
}


export const LayoutFrameLayout: React.FC<{ showHeader, showFooter, header, footer }> = (props) => {
  const {header, footer, children} = props;
  let {showHeader, showFooter} = props;
  if (typeof showHeader !== 'boolean') {
    showHeader = Boolean(header)
  }
  if (typeof showFooter !== 'boolean') {
    showFooter = Boolean(footer)
  }

  return (
    <Layout style={{height: '100%'}}>
      {header && showHeader && (
        <Layout.Header style={{backgroundColor: '#fff'}}>
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

