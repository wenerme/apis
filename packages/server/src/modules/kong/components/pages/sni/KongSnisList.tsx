import React, { useMemo } from 'react';
import { normalizeColumns } from '../../../../../libs/antds/table/normal';
import { KongUpstreamEntity } from '../../../apis/types';
import { renderTags, renderTimeStamp } from '../../renders';
import { KongEntityTable, OperationColumn, TagsField } from '../../entity/KongEntityTable';
import { FormFieldProps } from '../../../../../libs/antds/form/builder';
import { EntitySelect } from '../../entity/EntitySelect';
import { withProps } from '@wener/utils/src/reactx/hocs/withProps';
import { EntityForm } from '../../entity/EntityForm';

const fields: FormFieldProps[] = [
  { key: 'name', label: '名字' },
  TagsField,
  {
    key: 'certificate',
    label: '证书',
    widget: EntitySelect,
    widgetProps: {
      entityName: 'Certificate',
    },
  },
];

const SnisForm = withProps(EntityForm, { fields });

export const KongSnisList: React.FC = () => {
  const columns = useMemo(
    () =>
      normalizeColumns<KongUpstreamEntity>([
        { dataIndex: 'name', title: '名字', width: 120 },
        { dataIndex: 'id', title: 'ID', width: 300 },
        { key: 'certificate.id', title: '证书', width: 300 },
        { dataIndex: 'tags', title: '标签', width: 120, render: renderTags },
        {
          dataIndex: 'created_at',
          title: '创建时间',
          width: 160,
          render: renderTimeStamp,
        },
        OperationColumn,
      ]),
    []
  );
  return <KongEntityTable label="SNIs" name="Snis" columns={columns} editor={SnisForm} />;
};
