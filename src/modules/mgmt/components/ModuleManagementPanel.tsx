import React, { useEffect, useRef } from 'react';
import { Button, Dropdown, Form, Input, Menu, message, Modal, notification } from 'antd';
import { ModuleInfo, ModuleManagementService } from '../ModuleManagementService';
import { useImmer } from 'use-immer';
import { getBootService } from '../../boot';
import { ClearOutlined, PlusSquareOutlined, ReloadOutlined } from '@ant-design/icons';
import { ModuleList } from './ModuleList';
import { DownOutlined, EditOutlined, MinusSquareOutlined, UploadOutlined } from '@ant-design/icons/lib';

let _svc;

function getModuleMgmtService(): ModuleManagementService {
  return (_svc = _svc || new ModuleManagementService());
}

function getContentLength(url): Promise<number> {
  return fetch(url).then((v) => {
    const len = v.headers.get('content-length');
    if (len) {
      return parseInt(len, 10);
    }
    return v.arrayBuffer().then((v) => v.byteLength);
  });
}

async function refreshSize(modules: ModuleInfo[], updater, all = false) {
  let list = modules
    .map<[number, ModuleInfo]>((v, i) => [i, v])
    .filter(([_, v]) => !v.size);
  if (!all) {
    list = list.filter(([_, v]) => v.loaded);
  }

  const pendings: Promise<void>[] = list.map(async ([i, module]) => {
    updater((s) => {
      s[i].loadingSize = true;
    });
    const size = await getContentLength(module.resolved);
    try {
      updater((s) => {
        s[i].size = size;
        s[i].loadingSize = false;
      });
    } catch (e) {
      console.error(`failed to get size of`, module.name, module.resolved, e);
      updater((s) => {
        s[i].loadingSize = false;
      });
    }
  });
  return Promise.all(pendings);
}

export const ModuleManagementPanel: React.FC = () => {
  const svc = getModuleMgmtService();
  const System = getBootService().System;

  const [modules, updateModules] = useImmer<ModuleInfo[]>(() =>
    svc.getModules().sort((a, b) => a.name.localeCompare(b.name)),
  );
  useEffect(() => {
    refreshSize(modules, updateModules);
  }, []);
  const doRefresh = () => {
    updateModules((s) => svc.getModules().sort((a, b) => a.name.localeCompare(b.name)));
  };
  const doAddLocalModule = async (module) => {
    await svc.addOverrideModule(module);
    doRefresh();
  };
  const doResetLocalModule = async () => {
    await svc.resetOverrideModules();
    doRefresh();
  };

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
        //
        m.dependencies = Array.from(getBootService().modules.dependencies[name] || []);

        for (const depName of m.dependencies) {
          const dep = modules.find((v) => v.name === depName);
          if (dep && !dep.dependents.includes(name)) {
            dep.dependents = [...dep.dependents, name];
          }
        }
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
  const [edit, updateEdit] = useImmer({ editing: false, module: undefined });
  const onModuleEdit = (module) => {
    updateEdit((s) => {
      s.editing = true;
      s.module = module;
    });
  };
  const onModulePublish = (module) => {
    message.warn('尚未实现');
  };
  const onModuleReset = async (module) => {
    await svc.removeOverrideModule(module);
    doRefresh();
  };
  const onShowAllModuleSize = () => {
    return refreshSize(modules, updateModules, true);
  };
  return (
    <div>
      <ModuleEditDialog
        visible={edit.editing}
        module={edit.module}
        onModuleChange={async (v) => doAddLocalModule(v)}
        onVisibleChange={(v) =>
          updateEdit((s) => {
            s.editing = v;
          })
        }
      />
      <div>
        <ModuleToolBar
          onRefresh={doRefresh}
          onResetLocalModule={doResetLocalModule}
          onAddLocalModule={doAddLocalModule}
          onShowAllModuleSize={onShowAllModuleSize}
        />
      </div>
      <ModuleList
        modules={modules}
        onModuleLoad={doModuleLoad}
        onModuleUnload={doModuleUnload}
        renderActions={renderModuleActions({
          onModuleUnload: doModuleUnload,
          onModuleLoad: doModuleLoad,
          onModuleReset,
          onModuleEdit,
          onModulePublish,
        })}
      />
    </div>
  );
};

function renderModuleActions(opts: {
  onModuleLoad?;
  onModuleUnload?;
  onModulePublish?;
  onModuleEdit?;
  onModuleReset?;
}) {
  const { onModuleLoad, onModuleUnload, onModuleEdit, onModulePublish, onModuleReset } = opts;
  return (item: ModuleInfo) => [
    <Button onClick={() => onModuleLoad(item.name)} type="link" key="load" size="small" disabled={item.loaded}>
      加载
    </Button>,
    <Button onClick={() => onModuleUnload(item.name)} type="link" key="unload" size="small" disabled={!item.loaded}>
      卸载
    </Button>,
    <Dropdown
      key={'more'}
      overlay={
        <Menu>
          <Menu.Item onClick={() => onModulePublish(item)} icon={<UploadOutlined />}>
            发布
          </Menu.Item>
          <Menu.Item onClick={() => onModuleEdit(item)} icon={<EditOutlined />}>
            编辑
          </Menu.Item>
          <Menu.Item onClick={() => onModuleReset(item)} disabled={!item.override} icon={<MinusSquareOutlined />}>
            重置本地覆盖
          </Menu.Item>
        </Menu>
      }
    >
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        操作 <DownOutlined />
      </a>
    </Dropdown>,
  ];
}

const ModuleEditDialog: React.FC<{ visible?; onVisibleChange?; module?; onModuleChange? }> = ({
  visible,
  onVisibleChange,
  module,
  onModuleChange,
}) => {
  const [form] = Form.useForm();
  const lastRef = useRef(module);
  useEffect(() => {
    if (module && lastRef.current !== module) {
      lastRef.current = module;
      form.setFieldsValue(module);
    }
  }, [module]);
  return (
    <Modal title={'模块'} onOk={() => form.submit()} visible={visible} onCancel={() => onVisibleChange(false)}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={module || {}}
        onFinish={(v) => {
          if (onModuleChange(v) !== false) {
            onVisibleChange(false);
          }
        }}
      >
        <Form.Item name={'name'} label={'模块名'} required rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'resolved'} label={'地址'} required rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const ModuleToolBar: React.FC<{ onRefresh?; onAddLocalModule?; onResetLocalModule?; onShowAllModuleSize? }> = ({
  onRefresh,
  onResetLocalModule,
  onAddLocalModule,
  onShowAllModuleSize,
}) => {
  const [state, update] = useImmer({ editing: false, pendingShowAllModuleSize: false });
  const showAll = async () => {
    update((s) => {
      s.pendingShowAllModuleSize = true;
    });
    try {
      await onShowAllModuleSize();
    } finally {
      update((s) => {
        s.pendingShowAllModuleSize = false;
      });
    }
  };
  return (
    <div>
      <ModuleEditDialog
        visible={state.editing}
        onVisibleChange={(v) =>
          update((s) => {
            s.editing = v;
          })
        }
        onModuleChange={onAddLocalModule}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <Button.Group>
          <Button
            type={'primary'}
            icon={<PlusSquareOutlined />}
            onClick={() =>
              update((s) => {
                s.editing = true;
              })
            }
          >
            本地
          </Button>
          <Button onClick={onResetLocalModule} icon={<ClearOutlined />}>
            重置
          </Button>
        </Button.Group>
        <Button onClick={onRefresh} icon={<ReloadOutlined />}>
          刷新
        </Button>
        <Button loading={state.pendingShowAllModuleSize} onClick={showAll} icon={<ReloadOutlined />}>
          显示所有模块大小
        </Button>
      </div>
    </div>
  );
};
