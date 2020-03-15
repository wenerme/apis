import React, {useMemo} from 'react';
import {ConsumerForm} from 'modules/kong/components/pages/consumer/ConsumerForm';
import {KongEntityTable} from 'modules/kong/components/KongEntityTable';
import {buildEntityService} from 'modules/kong/apis/utils';
import {getKongService} from 'modules/kong/apis/client';
import {withProps} from 'libs/reacts/libs/withProps';
import {EntityForm} from 'modules/kong/components/EntityForm';
import {KongEntities} from 'modules/kong/KongEntities';


const EntityTable: React.FC<{ entity, parentId? }> = ({parentId, entity}) => {
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

export const ConsumerViewer: React.FC<{ initialValues, onSubmit }> = ({initialValues, onSubmit}) => {
  const {id: consumerId} = initialValues ?? {};
  return (
    <div>
      <ConsumerForm initialValues={initialValues} onSubmit={onSubmit} />

      <EntityTable entity={KongEntities.ConsumerBasicAuth} parentId={consumerId} />
      <EntityTable entity={KongEntities.ConsumerKeyAuth} parentId={consumerId} />
      <EntityTable entity={KongEntities.ConsumerHmacAuth} parentId={consumerId} />
      <EntityTable entity={KongEntities.ConsumerOAuth2} parentId={consumerId} />
      <EntityTable entity={KongEntities.ConsumerJwt} parentId={consumerId} />
      <EntityTable entity={KongEntities.ConsumerAcl} parentId={consumerId} />
    </div>
  )
};
