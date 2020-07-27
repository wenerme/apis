import React from 'react';
import { List, Skeleton, Tag } from 'antd';
import { ModuleInfo } from 'src/modules/mgmt/ModuleManagementService';

export const ModuleList: React.FC<{
  loading?;
  renderActions?;
  modules: ModuleInfo[];
  onModuleLoad?;
  onModuleUnload?;
}> = ({ loading, modules, renderActions = (v) => [] }) => {
  return (
    <div>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={modules}
        renderItem={(item) => (
          <List.Item actions={[...renderActions(item)]}>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={
                  <div>
                    <span>{item.name + (item.metadata?.title ? ` / ${item.metadata?.title}` : '')}</span>
                    <span style={{ paddingLeft: 10 }}>
                      {item.loaded && <Tag color="magenta">已加载</Tag>}
                      {item.predefined && <Tag color="green">预定义</Tag>}
                      {item.internal && <Tag color="lime">内部模块</Tag>}
                      {item.hasMetadata && <Tag color="gold">含元数据</Tag>}
                      {item.override && <Tag color="geekblue">覆盖</Tag>}
                    </span>
                  </div>
                }
                description={item.metadata?.description}
              />
              <div>
                <div>
                  <small>{item.resolved}</small>
                  <span style={{ paddingLeft: 8 }}>
                    <Tag>{item.version}</Tag>
                    <Tag>{item.source}</Tag>
                  </span>
                </div>
                <div style={{ maxWidth: '30vw' }}>
                  {Boolean(item.dependencies.length) && (
                    <div>
                      <small>依赖: {item.dependencies.join(',')}</small>
                    </div>
                  )}
                  {Boolean(item.dependents.length) && (
                    <div>
                      <small>被依赖: {item.dependents.join(',')}</small>
                    </div>
                  )}
                </div>
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};
