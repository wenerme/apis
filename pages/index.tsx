import React from 'react'
import {Button, Icon, Result} from 'antd';
import {PageLayout} from 'components/layout/PageLayout/PageLayout';

function IndexPage({}) {
  return (
    <PageLayout>
      <Result
        title="Wener's APIs"
        icon={<Icon type="api" />}
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
