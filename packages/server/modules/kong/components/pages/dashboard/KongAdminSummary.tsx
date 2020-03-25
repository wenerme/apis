import React, { useEffect } from 'react';
import { useKongSelector } from 'modules/kong/reducers/kong';
import { DataDescriptionProps, renderDataDescription } from 'libs/antds/description/data';
import { Card, Checkbox, Descriptions, Spin, Statistic, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { doUpdateInformation, doUpdateStatus } from 'modules/kong/reducers/actions';
import { KongInformation, KongNodeStatus } from 'modules/kong/apis/types';
import { formatBytes, parseBytes } from 'utils/bytes';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

const KongAdminSummary: React.FC = () => {
  const information = useKongSelector((s) => s.information);
  const status = useKongSelector((s) => s.status);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!information) {
      dispatch(doUpdateInformation());
    }
  }, []);
  useEffect(() => {
    if (!status) {
      dispatch(doUpdateStatus());
    }
  }, []);
  const { t } = useTranslation();

  const info: Array<DataDescriptionProps<KongInformation>> = [
    { label: '主机名', name: 'hostname' },
    { label: '节点ID', name: 'node_id', span: 2 },
    { label: '版本', name: 'version' },
    { label: 'LUA版本', name: 'lua_version' },
    { label: 'Tagline', name: 'tagline' },
  ];
  info.map((v) => {
    v.label = t(v.label as string);
    return v;
  });
  const statusItems: Array<DataDescriptionProps<KongNodeStatus>> = [
    {
      label: '数据库可访问',
      name: 'database.reachable',
      span: 2,
      render: ({ value }) => <Checkbox checked={Boolean(value)} />,
    },
    {
      label: 'LUA Workers',
      span: 2,
      render({ record }) {
        return record.memory.workers_lua_vms.length;
      },
    },
    {
      label: 'LUA Worker 内存',
      span: 4,
      render({ record }) {
        return formatBytes(
          record.memory.workers_lua_vms.map((v) => parseBytes(v.http_allocated_gc)).reduce((a, b) => a + b, 0)
        );
      },
    },
    {
      label: 'LUA 共享字典内存',
      span: 4,
      render({ record }) {
        const all: any[] = Object.values(record.memory.lua_shared_dicts);
        const a = all.map((v) => parseBytes(v.allocated_slabs)).reduce((a, b) => a + b, 0);
        const b = all.map((v) => parseBytes(v.capacity)).reduce((a, b) => a + b, 0);
        return `${formatBytes(a)} / ${formatBytes(b)}`;
      },
    },
  ];
  statusItems.map((v) => {
    v.label = t(v.label as string);
    return v;
  });

  const stats = [
    { label: '活跃链接', name: 'server.connections_active' },
    { label: '读取链接', name: 'server.connections_reading' },
    { label: '写入链接', name: 'server.connections_writing' },
    { label: '等待链接', name: 'server.connections_waiting' },
    { label: '接受链接', name: 'server.connections_accepted' },
    { label: '处理链接', name: 'server.connections_handled' },
    { label: '总请求数', name: 'server.total_requests' },
  ];

  return (
    <div>
      <div>
        <Spin spinning={!information} tip={t('加载中')}>
          <div>
            <Card title={t('连接', { count: 0, postProcess: 'inflection' })}>
              <div
                style={{
                  display: 'grid',
                  rowGap: 12,
                  columnGap: 12,
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gridAutoFlow: 'row',
                }}
              >
                {stats.map(({ label, name }) => (
                  <Statistic key={label} title={t(label).replace(' Connections', '')} value={get(status, name)} />
                ))}
              </div>
            </Card>

            <Card title={t('节点状态')}>
              <Descriptions>
                {info.map((v, i) => renderDataDescription(Object.assign({ value: information, key: i }, v)))}
              </Descriptions>
              <Descriptions column={4}>
                {statusItems.map((v, i) => renderDataDescription(Object.assign({ value: status, key: i }, v)))}
              </Descriptions>
            </Card>

            <Card title={t('插件列表')}>
              <div style={{ display: 'grid', gridAutoFlow: 'row', rowGap: 12 }}>
                <Card title={t('可用插件')}>
                  <div>
                    {Object.keys(information?.plugins?.available_on_server ?? {}).map((v) => (
                      <Tag key={v}>{v}</Tag>
                    ))}
                  </div>
                </Card>

                <Card title={t('集群启用插件')}>
                  <div>
                    {Object.keys(information?.plugins?.enabled_in_cluster ?? {}).map((v) => (
                      <Tag key={v}>{v}</Tag>
                    ))}
                    {Object.keys(information?.plugins?.enabled_in_cluster ?? {}).length ? '' : t('无')}
                  </div>
                </Card>
              </div>
            </Card>

            <Card title={t('配置信息')}>
              <pre>{JSON.stringify(information?.configuration, null, '  ')}</pre>
            </Card>
          </div>
        </Spin>
      </div>
    </div>
  );
};
export default KongAdminSummary;
