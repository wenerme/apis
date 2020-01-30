import React from 'react'
import {Button, ConfigProvider, Icon, Result} from 'antd';
import 'antd/dist/antd.css';

function IndexPage({}) {
  return (
    <ConfigProvider>
      <Result
        title="Wener's APIs"
        icon={<Icon type="api" />}
        extra={
          <Button type="primary" icon="github" target="_blank" href="https://github.com/wenerme/apis">
            wenerme/apis
          </Button>
        }
      />
    </ConfigProvider>
  )
}

export default IndexPage
