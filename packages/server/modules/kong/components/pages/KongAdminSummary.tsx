import React, {useEffect} from 'react'
import {useKongSelector} from 'modules/kong/reducers/kong';
import {DataDescriptionProps, renderDataDescription} from 'libs/antds/description/data';
import {Descriptions, Spin} from 'antd';
import {useDispatch} from 'react-redux';
import {doUpdateInformation} from 'modules/kong/reducers/actions';
import {KongInformation} from 'modules/kong/apis/types';

const KongAdminSummary: React.FC = () => {
  const information = useKongSelector(s => s.information);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!information) {
      dispatch(doUpdateInformation())
    }
  }, []);

  const info: Array<DataDescriptionProps<KongInformation>> = [
    {label: '主机名', name: 'hostname'},
    {label: '节点ID', name: 'node_id', span: 2},
    {label: '版本', name: 'version'},
    {label: 'LUA版本', name: 'lua_version'},
    {label: 'Tagline', name: 'tagline'},
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
