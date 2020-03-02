import React from 'react'
import {Button, Result} from 'antd';
import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {ApiOutlined} from '@ant-design/icons';

function IndexPage({}) {
  return (
    <PageLayout>
      <Result
        title="Wener's APIs"
        icon={<ApiOutlined style={{marginRight: 8}} />}
        extra={
          <Button type="primary" icon="github" target="_blank" href="https://github.com/wenerme/apis">
            wenerme/apis
          </Button>
        }
      />
    </PageLayout>
  )
}

export default IndexPage
