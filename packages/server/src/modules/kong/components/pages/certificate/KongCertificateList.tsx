import React, { useMemo } from 'react';
import { normalizeColumns } from '../../../../../libs/antds/table/normal';
import { KongUpstreamEntity } from '../../../apis/types';
import { renderTags, renderTimeStamp } from '../../renders';
import { KongEntityTable, OperationColumn, TagsField } from '../../entity/KongEntityTable';
import { FormFieldProps } from '../../../../../libs/antds/form/builder';
import { withProps } from '@wener/utils/lib/src/reactx/hocs/withProps';
import { EntityForm } from '../../entity/EntityForm';

const fields: FormFieldProps[] = [
  { key: 'cert', label: '证书', widget: 'textarea' },
  { key: 'key', label: '密钥', widget: 'textarea' },

  TagsField,
];

const CertificateForm = withProps(EntityForm, { fields });

export const KongCertificateList: React.FC = () => {
  const columns = useMemo(
    () =>
      normalizeColumns<KongUpstreamEntity>([
        { dataIndex: 'id', title: 'ID', width: 300 },
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
  return <KongEntityTable label="证书" name="Certificate" columns={columns} editor={CertificateForm} />;
};
