import React, { useMemo } from 'react';
import { normalizeColumns } from 'libs/antds/table/normal';
import { KongUpstreamEntity } from 'modules/kong/apis/types';
import { renderTags, renderTimeStamp } from 'modules/kong/components/renders';
import { KongEntityTable, OperationColumn, TagsField } from 'modules/kong/components/entity/KongEntityTable';
import { FormFieldProps } from 'libs/antds/form/builder';
import { withProps } from 'libs/reacts/libs/withProps';
import { EntityForm } from 'modules/kong/components/entity/EntityForm';

const fields: FormFieldProps[] = [{ key: 'cert', label: '证书', widget: 'textarea' }, TagsField];

const CaCertificateForm = withProps(EntityForm, { fields });

export const KongCaCertificateList: React.FC = () => {
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
  return <KongEntityTable label="CA证书" name="CaCertificate" columns={columns} editor={CaCertificateForm} />;
};
