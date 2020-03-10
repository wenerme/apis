import React, {useEffect} from 'react'
import {useKongSelector} from 'modules/kong/reducers/kong';
import {DataDescriptionProps, renderDataDescription} from 'libs/antds/description/data';
import {Checkbox, Descriptions, Spin} from 'antd';
import {useDispatch} from 'react-redux';
import {doUpdateInformation, doUpdateStatus} from 'modules/kong/reducers/actions';
import {KongInformation, KongNodeStatus} from 'modules/kong/apis/types';
import {formatBytes, parseBytes} from 'utils/bytes';

const KongAdminSummary: React.FC = () => {
  const information = useKongSelector(s => s.information);
  const status = useKongSelector(s => s.status);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!information) {
      dispatch(doUpdateInformation())
    }
  }, []);
  useEffect(() => {
    if (!status) {
      dispatch(doUpdateStatus())
    }
  }, []);

  const info: Array<DataDescriptionProps<KongInformation>> = [
    {label: '主机名', name: 'hostname'},
    {label: '节点ID', name: 'node_id', span: 2},
    {label: '版本', name: 'version'},
    {label: 'LUA版本', name: 'lua_version'},
    {label: 'Tagline', name: 'tagline'},
  ];
  const statusItems: Array<DataDescriptionProps<KongNodeStatus>> = [
    {label: '数据库可访问', name: 'database.reachable', render: ({value}) => <Checkbox checked={Boolean(value)} />},
    {label: '请求数', name: 'server.total_requests'},
    {label: '活跃链接', name: 'server.connections_active'},
    {label: '接受链接', name: 'server.connections_accepted'},
    {label: '处理链接', name: 'server.connections_handled'},
    {label: '读取链接', name: 'server.connections_reading'},
    {label: '写入链接', name: 'server.connections_writing'},
    {label: '等待链接', name: 'server.connections_waiting'},
    {
      label: 'LUA Workers', render({record}) {
        return record.memory.workers_lua_vms.length
      }
    },
    {
      label: 'LUA Worker 内存', render({record}) {
        return formatBytes(record.memory.workers_lua_vms.map(v => parseBytes(v.http_allocated_gc)).reduce((a, b) => a + b, 0))
      }
    },
    {
      label: 'LUA共享字典内存', span: 2, render({record}) {
        const all: any[] = Object.values(record.memory.lua_shared_dicts);
        const a = all.map(v => parseBytes(v.allocated_slabs)).reduce((a, b) => a + b, 0);
        const b = all.map(v => parseBytes(v.capacity)).reduce((a, b) => a + b, 0);
        return `${formatBytes(a)} / ${formatBytes(b)}`
      }
    },
  ];

  return (
    <div>
      <div>
        <Spin spinning={!information} tip="加载中">
          <h2>基础信息</h2>
          <Descriptions>
            {info.map((v, i) => (
              renderDataDescription(Object.assign({value: information, key: i}, v))
            ))}
          </Descriptions>
          <h2>插件列表</h2>
          <div>
            <h3>可用插件</h3>
            <div>
              {Object.keys(information?.plugins?.available_on_server ?? {}).join(', ') || '无'}
            </div>
            <h3>集群启用插件</h3>
            <div>
              {Object.keys(information?.plugins?.enabled_in_cluster ?? {}).join(', ') || '无'}
            </div>
          </div>
          <h2>节点状态</h2>
          <Descriptions column={4}>
            {statusItems.map((v, i) => (
              renderDataDescription(Object.assign({value: status, key: i}, v))
            ))}
          </Descriptions>
          <h2>配置信息</h2>
          <pre>
{JSON.stringify(information?.configuration, null, '  ')}
          </pre>
        </Spin>
      </div>

    </div>
  )
};
export default KongAdminSummary
