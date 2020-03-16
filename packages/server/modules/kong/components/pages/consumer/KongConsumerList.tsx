import React, {useMemo} from 'react'
import {normalizeColumns} from 'libs/antds/table/normal';
import {KongUpstreamEntity} from 'modules/kong/apis/types';
import {KongEntityTable, OperationColumn} from 'modules/kong/components/entity/KongEntityTable';
import {renderTags, renderTimeStamp} from 'modules/kong/components/renders';
import {ConsumerForm} from 'modules/kong/components/pages/consumer/ConsumerForm';
import {ConsumerViewer} from 'modules/kong/components/pages/consumer/ConsumerViewer';

export const KongConsumerList: React.FC = () => {
  const columns = useMemo(() => normalizeColumns<KongUpstreamEntity>([
    {dataIndex: 'id', title: 'ID', width: 300},
    {
      key: 'username',
      title: '用户名',
      width: 120
    },
    {
      key: 'custom_id',
      title: '自定义',
      width: 120
    },
    {dataIndex: 'tags', title: '标签', width: 120, render: renderTags},
    {dataIndex: 'created_at', title: '创建时间', width: 160, render: renderTimeStamp},
    OperationColumn,
  ]), []);
  return (
    <KongEntityTable
      label='消费者'
      name='Consumer'
      columns={columns}
      editor={ConsumerForm}
      viewer={ConsumerViewer}
    />
  )
};

