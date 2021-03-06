import React, { useContext, useMemo, useState } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Button, Drawer, message, Popconfirm, Spin, Table } from 'antd';
import { getKongService } from '../../apis/client';
import produce from 'immer';
import { CopyOutlined, DeleteOutlined, InfoCircleOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons/lib';
import { renderTags, renderTimeStamp } from '../renders';
import { Trans, useTranslation } from 'react-i18next';
import { buildEntityService } from '../../apis/utils';
import { KongEntityService } from '../../apis/service';
import { FormFieldProps } from 'src/libs/antds/form/builder';
import { useAsyncEffect } from 'src/ui';
import { TagsInput } from '../TagsInput';

export interface KongEntityTableProps {
  label;
  name;

  columns?;

  editor?;
  viewer?;

  entityService?: KongEntityService;
}

export interface KongEntityTableService {
  readonly label;
  readonly name;
  readonly entityService: KongEntityService;

  showView(entity);

  showAdd(entity?);

  delete(entity);

  reload();
}

export const KongEntityTableServiceContext = React.createContext<KongEntityTableService>(null);

export function useKongEntityTableService(): KongEntityTableService {
  return useContext(KongEntityTableServiceContext);
}

export const KongEntityOperationColumn: React.FC<{ record }> = ({ record, children }) => {
  const service = useKongEntityTableService();
  const { t } = useTranslation();
  return (
    <div className="no-wrap">
      <Button type="link" onClick={() => service.showView(record)} title={t('详情')} icon={<InfoCircleOutlined />} />
      <Button type="link" onClick={() => service.showAdd(record)} title={t('复制')} icon={<CopyOutlined />} />
      <Popconfirm
        title={`${t('确认删除')} ${record['name']}？`}
        onConfirm={() => service.delete(record)}
        okText={t('确认')}
        cancelText={t('取消')}
      >
        <Button type="link" title={t('删除')} danger icon={<DeleteOutlined />} />
      </Popconfirm>
      {children}
    </div>
  );
};

export const TagsField: FormFieldProps = {
  key: 'tags',
  label: '标签',
  widget: TagsInput,
  defaultValue: [],
};

export const OperationColumn: ColumnProps<any> = {
  title: <Trans>操作</Trans>,
  key: 'operation',
  fixed: 'right',
  width: 160,
  render: (v, r, i) => <KongEntityOperationColumn record={r} />,
};

export function createEntityColumns<T = any>(
  columns: Array<ColumnProps<T>>,
  { excludes = [] } = {},
): Array<ColumnProps<T>> {
  const cols: Array<ColumnProps<T>> = [
    {
      dataIndex: 'name',
      title: '名字',
      fixed: 'left',
      width: 140,
      className: 'no-wrap',
    },
    { dataIndex: 'id', title: 'ID', width: 300 },

    ...columns,

    { dataIndex: 'tags', title: '标签', width: 120, render: renderTags },

    {
      dataIndex: 'created_at',
      title: '创建时间',
      width: 160,
      render: renderTimeStamp,
    },
    {
      dataIndex: 'updated_at',
      title: '更新时间',
      width: 160,
      render: renderTimeStamp,
    },

    OperationColumn,
  ];
  return cols.filter((v) => !excludes.includes(v.key || v.dataIndex));
}

function createKongEntityTableService(props: KongEntityTableProps, setState, entityService): KongEntityTableService {
  const { name, label } = props;
  return {
    get name() {
      return name;
    },
    get label() {
      return label;
    },
    get entityService() {
      return entityService;
    },
    showView(entity) {
      setState(
        produce((s) => {
          s.editing = entity;
        }),
      );
    },
    showAdd(entity?) {
      if (entity) {
        const { id, name, ...e } = entity;
        entity = e;
      }
      setState(
        produce((s) => {
          s.creating = entity || true;
        }),
      );
    },
    async delete(entity) {
      await entityService.delete(entity);
      this.reload();
    },
    reload() {
      setState(
        produce((s) => {
          s.count++;
        }),
      );
    },
  };
}

export const KongEntityTable: React.FC<KongEntityTableProps> = (props) => {
  const { name, columns, editor, viewer = editor } = props;
  const { t } = useTranslation();

  let { label } = props;
  label = t(label, { count: 0, postProcess: 'inflection' });
  //
  columns.map((v) => {
    if (typeof v.title === 'string') {
      v.title = t(v.title);
    }
    return v;
  });

  const [state, setState] = useState({
    loading: false,
    rows: [],
    offset: null,
    count: 0,
    editing: null,
    creating: null,
  });
  const { loading, rows, offset, count, editing, creating } = state;

  let { entityService } = props;
  entityService = useMemo(() => entityService ?? buildEntityService(getKongService, name), [name]);

  const service = useMemo(() => createKongEntityTableService(props, setState, entityService), []);
  useAsyncEffect(async () => {
    setState(
      produce((s) => {
        s.loading = true;
      }),
    );
    try {
      const { data, offset } = await entityService.list();
      setState(
        produce((s) => {
          s.loading = false;
          s.rows = data;
          s.next = offset;
        }),
      );
    } catch (e) {
      message.error(`${t('错误')}: ${e.message || e}`);
    } finally {
      setState(
        produce((s) => {
          s.loading = false;
        }),
      );
    }
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
            setState(
              produce((s) => {
                s.editing = null;
                s.count++;
              }),
            );
          }}
        />
        <AddEntityDrawer
          label={label}
          name={name}
          initialEntity={creating === true ? null : creating}
          visible={Boolean(creating)}
          component={editor}
          onClose={() => {
            setState(
              produce((s) => {
                s.creating = null;
                s.count++;
              }),
            );
          }}
        />

        <Table
          className="no-wrap"
          rowKey={'id'}
          columns={columns}
          dataSource={rows}
          loading={loading}
          scroll={{ x: 1200 }}
          title={() => {
            return (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h2>{label}</h2>
                <div>
                  <Button.Group>
                    <Button type="primary" onClick={() => doAdd()} icon={<PlusOutlined />}>
                      {t('添加')}
                    </Button>
                    <Button onClick={() => doReload()} icon={<ReloadOutlined />}>
                      {t('刷新')}
                    </Button>
                  </Button.Group>
                </div>
              </div>
            );
          }}
        />
      </div>
    </KongEntityTableServiceContext.Provider>
  );
};

const ViewEntityDrawer: React.FC<{
  label;
  name;
  initialEntity;
  visible;
  onClose;
  component;
}> = ({ label, name, initialEntity, visible, onClose, component: Component }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { entityService } = useKongEntityTableService();
  return (
    <Drawer
      title={`${label} ${t('详情')}`}
      placement="right"
      onClose={onClose}
      visible={visible}
      destroyOnClose
      closable
      width="75vw"
    >
      <Spin spinning={loading}>
        <Component
          initialValues={initialEntity}
          onSubmit={async (v) => {
            try {
              setLoading(true);
              await entityService.update(v);
            } catch (e) {
              message.error(`${t('更新')}${t('失败')}: ${e.message || e}`);
            } finally {
              setLoading(false);
            }
          }}
        />
      </Spin>
    </Drawer>
  );
};

const AddEntityDrawer: React.FC<{
  label;
  name;
  initialEntity;
  visible;
  onClose;
  component;
}> = ({ label, name, initialEntity, visible, onClose, component: Component }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { entityService } = useKongEntityTableService();
  return (
    <Drawer
      title={`${t('新增')} ${label}`}
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
          onSubmit={async (v) => {
            try {
              setLoading(true);
              await entityService.add(v);
              onClose();
            } catch (e) {
              message.error(`${t('添加')}${t('失败')}: ${e.message || e}`);
            } finally {
              setLoading(false);
            }
          }}
        />
      </Spin>
    </Drawer>
  );
};
