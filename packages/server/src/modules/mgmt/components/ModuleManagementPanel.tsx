import React from 'react';
import { Button, Form, Input, Modal, notification } from 'antd';
import { ModuleInfo, ModuleManagementService } from 'src/modules/mgmt/ModuleManagementService';
import { useImmer } from 'use-immer';
import { getBootService } from 'src/modules/boot';
import { ClearOutlined, PlusSquareOutlined, ReloadOutlined } from '@ant-design/icons';
import { ModuleList } from 'src/modules/mgmt/components/ModuleList';

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
  const doRefresh = () => {
    updateModules((s) => svc.getModules().sort((a, b) => a.name.localeCompare(b.name)));
  };
  const doAddLocalModule = (module) => {
    svc.addOverrideModule(module);
  };
  const doResetLocalModule = () => {
    svc.resetOverrideModules();
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
  return (
    <div>
      <div>
        <ModuleToolBar
          onRefresh={doRefresh}
          onResetLocalModule={doResetLocalModule}
          onAddLocalModule={doAddLocalModule}
        />
      </div>
      <ModuleList modules={modules} onModuleLoad={doModuleLoad} onModuleUnload={doModuleUnload} />
    </div>
  );
};
const ModuleEditDialog: React.FC<{ visible?; onVisibleChange?; module?; onModuleChange? }> = ({
  visible,
  onVisibleChange,
  module,
  onModuleChange,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal title={'模块'} onOk={() => form.submit()} visible={visible} onCancel={() => onVisibleChange(false)}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={module || {}}
        onFinish={(v) => {
          onModuleChange(v);
          onVisibleChange(false);
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
const ModuleToolBar: React.FC<{ onRefresh?; onAddLocalModule?; onResetLocalModule? }> = ({
  onRefresh,
  onResetLocalModule,
  onAddLocalModule,
}) => {
  const [state, update] = useImmer({ editing: false });
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
      </div>
    </div>
  );
};
