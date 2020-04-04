import React, { useMemo } from 'react';
import { normalizeColumns } from 'src/libs/antds/table/normal';
import { KongUpstreamEntity } from '../../../apis/types';
import { KongEntityTable, OperationColumn } from '../../entity/KongEntityTable';
import { renderTags, renderTimeStamp } from '../../renders';
import { ConsumerForm } from './ConsumerForm';
import { ConsumerViewer } from './ConsumerViewer';

export const KongConsumerList: React.FC = () => {
  const columns = useMemo(
    () =>
      normalizeColumns<KongUpstreamEntity>([
        { dataIndex: 'id', title: 'ID', width: 300 },
        {
          key: 'username',
          title: '用户名',
          width: 120,
        },
        {
          key: 'custom_id',
          title: '自定义',
          width: 120,
        },
        { dataIndex: 'tags', title: '标签', width: 120, render: renderTags },
        {
          dataIndex: 'created_at',
          title: '创建时间',
          width: 160,
          render: renderTimeStamp,
        },
        OperationColumn,
      ]),
    [],
  );
  return (
    <KongEntityTable label="消费者" name="Consumer" columns={columns} editor={ConsumerForm} viewer={ConsumerViewer} />
  );
};
