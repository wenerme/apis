import React, {useEffect, useMemo, useReducer, useState} from 'react'
import {Button, Divider, Drawer, Form, message, notification, Popconfirm, Spin, Table} from 'antd';
import {normalizeColumns} from 'libs/antds/table/normal';
import {KongServiceEntity} from 'modules/kong/apis/types';
import {kongService} from 'modules/kong/apis/client';
import URI from 'urijs'
import {CopyOutlined, DeleteOutlined, InfoCircleOutlined, PlusOutlined, ReloadOutlined} from '@ant-design/icons/lib';
import {buildInitialValues, FormFieldsBuilder} from 'libs/antds/form/builder';
import {cloneDeep} from 'lodash';
import {renderTimeStamp} from 'modules/kong/components/renders';


const ServiceForm: React.FC<{ initialValues?, onSubmit? }> = ({initialValues, onSubmit}) => {
  const fields = [
    {key: 'name', label: '名字'},
    {
      key: 'retries',
      label: '重试次数',
      widget: 'number',
      defaultValue: 5,
      required: true,
      help: '代理请求失败的重试次数'
    },
    {key: 'connect_timeout', label: '链接超时', widget: 'number', required: true, defaultValue: 60000},
    {key: 'write_timeout', label: '写超时', widget: 'number', required: true, defaultValue: 60000},
    {key: 'read_timeout', label: '读超时', widget: 'number', required: true, defaultValue: 60000},
  ];
  const connectionFields = [
    {
      key: 'url',
      label: 'URL',
    },
    {
      key: 'protocol',
      label: '协议',
      widget: 'select',
      required: true,
      defaultValue: 'http',
      options: ['grpc', 'grpcs', 'http', 'https', 'tcp', 'tls'],
    },
    {
      key: 'host',
      label: '主机',
      defaultValue: '172.19.0.1',
      required: true,
    },
    {
      key: 'port',
      label: '端口',
      defaultValue: 80,
      widget: 'number',
      // rules: [{min: 0, max: 65535}],
      required: true,
    },
    {
      key: 'path',
      label: '路径',
    },
  ];

  const initial = useMemo(() => {
    const o = initialValues ?? buildInitialValues([...fields, ...connectionFields]);
    if (!o['url']) {
      const {protocol, host, port, path} = o;
      o['url'] = new URI({protocol, hostname: host, port, path}).toString()
    }
    return o
  }, [initialValues]);
  // useEffect(() => {
  //   form.resetFields();
  // }, [initial])
  // console.log(`Initial`, initialValues, initial)

  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      initialValues={initial}
      labelCol={{span: 4}}
      wrapperCol={{span: 20}}
      onFinish={onSubmit}
      onValuesChange={(v, r) => {
        const f = ['host', 'protocol', 'port', 'path'];
        if (v['url']) {
          try {
            const uri = new URI(v['url']);
            const o = {};
            f.forEach(v => {
              const neo = uri[v]();
              if (r[v] !== neo) {
                o[v] = neo;
              }
            });
            form.setFieldsValue(o);
          } catch (e) {
            message.error(`无效的URL: ${e}`)
          }
        } else {
          const {protocol, host, port, path} = r;
          const neo = new URI({protocol, hostname: host, port, path}).toString();
          if (neo !== r['url']) {
            form.setFieldsValue({url: neo});
          }
        }
      }}
    >
      <FormFieldsBuilder pure fields={fields} />
      <Divider>上游</Divider>
      <FormFieldsBuilder pure fields={connectionFields} />


      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <Button htmlType="submit" type="primary">提交</Button>
        <Button htmlType="reset" onClick={() => form.resetFields()}>重置</Button>
      </div>
    </Form>
  )
};

const AddServiceDrawer: React.FC<{ visible, onClose, initialValues? }> = ({visible, onClose, initialValues}) => {
  const [loading, setLoading] = useState(false);

  return (
    <Drawer
      title="新增服务"
      placement="right"
      onClose={onClose}
      visible={visible}
      destroyOnClose
      closable
      width="60vw"
    >

      <Spin spinning={loading}>
        <ServiceForm initialValues={initialValues} onSubmit={async v => {
          try {
            setLoading(true);
            await kongService.addService(v);
            onClose()
          } catch (e) {
            notification.error({
              message: '新增服务失败',
              description: `ERROR ${e}`,
            })
          } finally {
            setLoading(false)
          }
        }} />
      </Spin>
    </Drawer>
  )
};

const ViewServiceDrawer: React.FC<{ service, visible, onClose }> = ({service, visible, onClose}) => {
  const [loading, setLoading] = useState(false);

  return (
    <Drawer
      title="服务详情"
      placement="right"
      onClose={onClose}
      visible={visible}
      destroyOnClose
      closable
      width="60vw"
    >
      <Spin spinning={loading}>
        <ServiceForm
          initialValues={service}
          onSubmit={async v => {
            try {
              setLoading(true);
              await kongService.updateService(v);
              setLoading(false)
            } catch (e) {
              message.error(`更新失败: ${e}`)
            }
          }}
        />
      </Spin>
    </Drawer>
  )
};


export const KongServiceList: React.FC = () => {

  const [showAdd, setShowAdd] = useState(false);
  const [addInitial, setAddInitial] = useState(null);

  const [viewService, setViewService] = useState(null);

  const [loading, setLoading] = useState(false);
  const [count, doCount] = useReducer(a => a + 1, 0);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setLoading(true);
    kongService
      .listService()
      .then(v => setRows(v.data))
      .finally(() => setLoading(false))
  }, [count]);

  const doAdd = (v?) => {
    if (v) {
      v = cloneDeep(v);
      delete v['id'];
      delete v['name']
    }
    setAddInitial(v);
    setShowAdd(true);
  };

  const columns = useMemo(() => normalizeColumns<KongServiceEntity>([
    // {dataIndex: 'id', title: 'ID'},
    {dataIndex: 'name', title: '名字', fixed: 'left', width: 140, className: 'no-wrap'},
    {
      title: '目标',
      width: 250,
      className: 'no-wrap',
      render(v, r, i): any {
        const {host, protocol, path, port} = r;
        const uri = new URI('');
        Object.entries({host, protocol, path, port})
          .forEach(([k, v]) => {
            if (v) {
              uri[k](v)
            }
          });
        return uri.toString()
      }
    },
    {dataIndex: 'retries', title: '重试'},
    {
      dataIndex: 'tags', title: '标签',
      render(v) {
        return (v ?? []).join(',')
      }
    },
    {dataIndex: 'connect_timeout', title: '链接超时', width: 100},
    {dataIndex: 'write_timeout', title: '写超时', width: 100},
    {dataIndex: 'read_timeout', title: '读超时', width: 100},
    {dataIndex: 'created_at', title: '创建时间', width: 160, render: renderTimeStamp},
    {dataIndex: 'updated_at', title: '更新时间', width: 160, render: renderTimeStamp},
    {
      title: '操作', fixed: 'right', width: 160, render(v, r, i): any {
        return (
          <div className="no-wrap">
            <Button
              type="link" onClick={() => setViewService(r)}
              title="详情"
              icon={<InfoCircleOutlined />}
            />
            <Button
              type="link" onClick={() => doAdd(r)}
              title="复制"
              icon={<CopyOutlined />}
            />
            <Popconfirm
              title={`确认删除服务 ${r['name']}？`}
              onConfirm={async () => {
                try {
                  setLoading(true);
                  await kongService.deleteService(r['id']);
                } catch (e) {
                  message.error(`删除失败：${e}`)
                } finally {
                  setLoading(false)
                }

                doCount()
              }}
              okText="确认"
              cancelText="取消"
            >
              <Button type='link' title="删除" danger icon={<DeleteOutlined />} />
            </Popconfirm>

          </div>
        )
      }
    },
  ]), []);


  return (
    <div>
      <AddServiceDrawer initialValues={addInitial} visible={showAdd} onClose={() => {
        setShowAdd(false);
        doCount()
      }} />
      <ViewServiceDrawer service={viewService} visible={Boolean(viewService)} onClose={() => setViewService(null)} />

      <Table
        className="no-wrap"
        rowKey={'id'}
        columns={columns}
        dataSource={rows}
        loading={loading}

        scroll={{x: 1200}}

        title={() => {
          return (
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h2>服务</h2>
              <div>
                <Button.Group>
                  <Button type="primary" onClick={() => doAdd()} icon={<PlusOutlined />}>添加</Button>
                  <Button onClick={() => doCount()} icon={<ReloadOutlined />}>刷新</Button>
                </Button.Group>
              </div>
            </div>
          )
        }}
      />
    </div>
  )
};

