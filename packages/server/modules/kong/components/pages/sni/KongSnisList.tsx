import React, {useMemo} from 'react'
import {normalizeColumns} from 'libs/antds/table/normal';
import {KongUpstreamEntity} from 'modules/kong/apis/types';
import {renderTags, renderTimeStamp} from 'modules/kong/components/renders';
import {KongEntityTable, OperationColumn, TagsField} from 'modules/kong/components/entity/KongEntityTable';
import {FormFieldProps} from 'libs/antds/form/builder';
import {EntitySelect} from 'modules/kong/components/entity/EntitySelect';
import {withProps} from 'libs/reacts/libs/withProps';
import {EntityForm} from 'modules/kong/components/entity/EntityForm';

const fields: FormFieldProps[] = [
  {key: 'name', label: '名字'},
  TagsField,
  {
    key: 'certificate',
    label: '证书',
    widget: EntitySelect,
    widgetProps: {
      entityName: 'Certificate'
    }
  },
];

const SnisForm = withProps(EntityForm, {fields});

export const KongSnisList: React.FC = () => {
  const columns = useMemo(() => normalizeColumns<KongUpstreamEntity>([
    {dataIndex: 'name', title: '名字', width: 120},
    {dataIndex: 'id', title: 'ID', width: 300},
    {key: 'certificate.id', title: '证书', width: 300},
    {dataIndex: 'tags', title: '标签', width: 120, render: renderTags},
    {dataIndex: 'created_at', title: '创建时间', width: 160, render: renderTimeStamp},
    OperationColumn,
  ]), []);
  return (
    <KongEntityTable
      label='SNIs'
      name='Snis'
      columns={columns}
      editor={SnisForm}
    />
  )
};

