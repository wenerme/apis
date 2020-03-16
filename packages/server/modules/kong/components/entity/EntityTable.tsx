import React, {useMemo} from 'react';
import {buildEntityService} from 'modules/kong/apis/utils';
import {getKongService} from 'modules/kong/apis/client';
import {KongEntityTable} from 'modules/kong/components/entity/KongEntityTable';
import {withProps} from 'libs/reacts/libs/withProps';
import {EntityForm} from 'modules/kong/components/entity/EntityForm';

export const EntityTable: React.FC<{ entity, parentId? }> = ({parentId, entity}) => {
  const {name, label, columns, fields, editor, viewer} = entity;
  const entityService = useMemo(() => {
    if (!parentId) {
      return buildEntityService(getKongService, name)
    } else {
      return buildEntityService(getKongService, name, (...args) => next => next(parentId, ...args))
    }
  }, [parentId]);

  return (<KongEntityTable
    label={label}
    name={name}
    columns={columns}
    editor={editor ?? withProps(EntityForm, {fields})}
    viewer={viewer}
    entityService={entityService}
  />)
};
