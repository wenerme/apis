import React from 'react';
import { Button, List, notification, Skeleton, Tag } from 'antd';
import { ModuleInfo, ModuleManagementService } from 'src/modules/mgmt/ModuleManagementService';
import { useImmer } from 'use-immer';
import { getBootService } from 'src/modules/boot';

let _svc;

function getModuleMgmtService(): ModuleManagementService {
  return (_svc = _svc || new ModuleManagementService());
}

export const ModuleManagementPanel: React.FC = () => {
  const svc = getModuleMgmtService();
  const System = getBootService().System;

  const [modules, updateModules] = useImmer<ModuleInfo[]>(() =>
    svc.getModules().sort((a, b) => a.name.localeCompare(b.name)),
  );
  const doModuleLoad = async (name) => {
    updateModules((modules) => {
      modules.find((v) => v.name === name).loading = true;
    });
    try {
      await System.import(name);
      updateModules((modules) => {
        const m = modules.find((v) => v.name === name);
        m.loading = false;
        m.loaded = true;
      });
    } catch (e) {
      notification.error({ message: String(e) });

      updateModules((modules) => {
        const m = modules.find((v) => v.name === name);
        m.loading = false;
        m.loaded = false;
      });
    }
  };

  const doModuleUnload = (name) => {
    updateModules((modules) => {
      const m = modules.find((v) => v.name === name);
      System.delete(m.resolved);

      m.loading = false;
      m.loaded = System.has(m.resolved);
    });
  };
  return (
    <div>
      <ModuleList modules={modules} onModuleLoad={doModuleLoad} onModuleUnload={doModuleUnload} />
    </div>
  );
};

const ModuleList: React.FC<{ loading?; modules: ModuleInfo[]; onModuleLoad?; onModuleUnload? }> = ({
  loading,
  modules,
  onModuleLoad,
  onModuleUnload,
}) => {
  return (
    <div>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={modules}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                onClick={() => onModuleLoad(item.name)}
                type="link"
                key="load"
                size="small"
                disabled={item.loaded}
              >
                加载
              </Button>,
              <Button
                onClick={() => onModuleUnload(item.name)}
                type="link"
                key="unload"
                size="small"
                disabled={!item.loaded}
              >
                卸载
              </Button>,
            ]}
          >
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
