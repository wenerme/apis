import React, {useContext, useEffect, useMemo, useState} from 'react';
import {ColumnProps} from 'antd/lib/table';
import {Button, Drawer, message, Popconfirm, Spin, Table} from 'antd';
import {kongService} from 'modules/kong/apis/client';
import produce from 'immer';
import {CopyOutlined, DeleteOutlined, InfoCircleOutlined, PlusOutlined, ReloadOutlined} from '@ant-design/icons/lib';
import {renderTags, renderTimeStamp} from 'modules/kong/components/renders';

export interface KongEntityTableProps {
  label
  name

  columns?

  editor?
  viewer?
}

export interface KongEntityTableService {
  readonly label
  readonly name

  showView(entity)

  showAdd(entity?)

  delete(entity)

  reload()
}

export const KongEntityTableServiceContext = React.createContext<KongEntityTableService>(null);

export function useKongEntityTableService(): KongEntityTableService {
  return useContext(KongEntityTableServiceContext)
}

export const KongEntityOperationColumn: React.FC<{ record }> = ({record, children}) => {
  const service = useKongEntityTableService();
  return (
    <div className="no-wrap">
      <Button
        type="link" onClick={() => service.showView(record)}
        title="详情"
        icon={<InfoCircleOutlined />}
      />
      <Button
        type="link" onClick={() => service.showAdd(record)}
        title="复制"
        icon={<CopyOutlined />}
      />
      <Popconfirm
        title={`确认删除 ${record['name']}？`}
        onConfirm={() => service.delete(record)}
        okText="确认"
        cancelText="取消"
      >
        <Button type='link' title="删除" danger icon={<DeleteOutlined />} />
      </Popconfirm>
      {children}
    </div>
  )
};
export const OperationColumn: ColumnProps<any> = {
  title: '操作', fixed: 'right', width: 160, render: (v, r, i) => <KongEntityOperationColumn record={r} />
};

export function createEntityColumns<T = any>(columns: Array<ColumnProps<T>>): Array<ColumnProps<T>> {
  return [
    {dataIndex: 'name', title: '名字', fixed: 'left', width: 140, className: 'no-wrap'},
    {dataIndex: 'id', title: 'ID', width: 300},

    ...columns,

    {dataIndex: 'tags', title: '标签', width: 120, render: renderTags},

    {dataIndex: 'created_at', title: '创建时间', width: 160, render: renderTimeStamp},
    {dataIndex: 'updated_at', title: '更新时间', width: 160, render: renderTimeStamp},

    OperationColumn,
  ]
}

function createKongEntityTableService(props: KongEntityTableProps, setState): KongEntityTableService {
  const {name, label} = props;
  return {
    get name() {
      return name
    },
    get label() {
      return label
    },
    showView(entity) {
      setState(produce(s => {
        s.editing = entity
      }))
    },
    showAdd(entity?) {
      if (entity) {
        const {id, name, ...e} = entity;
        entity = e;
      }
      setState(produce(s => {
        s.creating = entity || true
      }))
    },
    async delete(entity) {
      await kongService[`delete${name}`](entity);
      this.reload()
    },
    reload() {
      setState(produce(s => {
        s.count++
      }))
    }
  }
}

export const KongEntityTable: React.FC<KongEntityTableProps> = (props) => {
  const {label, name, columns, editor, viewer = editor} = props;
  const [state, setState] = useState({
    loading: false, rows: [], offset: null, count: 0,
    editing: null,
    creating: null,
  });
  const {loading, rows, offset, count, editing, creating} = state;
  const service = useMemo(() => createKongEntityTableService(props, setState), []);
  useEffect(() => {
    setState(produce(s => {
      s.loading = true
    }));
    kongService
      ?.[`list${name}`]()
      .then(({data, offset}) => {
        setState(produce(s => {
          s.loading = false;
          s.rows = data;
          s.next = offset
        }))
      })
      .finally(() => {
        setState(produce(s => {
          s.loading = false
        }))
      })
  }, [count, offset]);

  const doAdd = service.showAdd;
  const doReload = service.reload;

  return (
    <KongEntityTableServiceContext.Provider value={service}>
      <div>
        <ViewEntityDrawer
          label={label}
          name={name}
          initialEntity={editing}
          visible={Boolean(editing)}
          component={viewer}
          onClose={() => {
            setState(produce(s => {
              s.editing = null;
              s.count++
            }))
          }} />
        <AddEntityDrawer
          label={label}
          name={name}
          initialEntity={creating === true ? null : creating}
          visible={Boolean(creating)}
          component={viewer}
          onClose={() => {
            setState(produce(s => {
              s.creating = null;
              s.count++
            }))
          }} />
        {/*<AddServiceDrawer initialValues={addInitial} visible={showAdd} onClose={() => {*/}
        {/*  setShowAdd(false);*/}
        {/*  doCount()*/}
        {/*}} />*/}
        {/*<ViewServiceDrawer service={viewService} visible={Boolean(viewService)} onClose={() => setViewService(null)} />*/}

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
                <h2>{label}</h2>
                <div>
                  <Button.Group>
                    <Button type="primary" onClick={() => doAdd()} icon={<PlusOutlined />}>添加</Button>
                    <Button onClick={() => doReload()} icon={<ReloadOutlined />}>刷新</Button>
                  </Button.Group>
                </div>
              </div>
            )
          }}
        />
      </div>
    </KongEntityTableServiceContext.Provider>
  )
};

const ViewEntityDrawer: React.FC<{ label, name, initialEntity, visible, onClose, component }> = ({label, name, initialEntity, visible, onClose, component: Component}) => {
  const [loading, setLoading] = useState(false);

  return (
    <Drawer
      title={`${label}详情`}
      placement="right"
      onClose={onClose}
      visible={visible}
      destroyOnClose
      closable
      width="60vw"
    >
      <Spin spinning={loading}>
        <Component
          initialValues={initialEntity}
          onSubmit={async v => {
            try {
              setLoading(true);
              await kongService[`update${name}`](v);
            } catch (e) {
              console.error(`update ${name} failed `, v, e);
              message.error(`更新失败: ${e.message || e.toString()}`)
            } finally {
              setLoading(false)
            }
          }}
        />
      </Spin>
    </Drawer>
  )
};


const AddEntityDrawer: React.FC<{ label, name, initialEntity, visible, onClose, component }> = ({label, name, initialEntity, visible, onClose, component: Component}) => {
  const [loading, setLoading] = useState(false);

  return (
    <Drawer
      title={`添加${label}`}
      placement="right"
      onClose={onClose}
      visible={visible}
      destroyOnClose
      closable
      width="60vw"
    >
      <Spin spinning={loading}>
        <Component
          initialValues={initialEntity}
          onSubmit={async v => {
            try {
              setLoading(true);
              await kongService[`add${name}`](v);
              setLoading(false);
              onClose()
            } catch (e) {
              message.error(`更新失败: ${e}`)
            }
          }}
        />
      </Spin>
    </Drawer>
  )
};
