import React from 'react';
import {ConsumerForm} from 'modules/kong/components/pages/consumer/ConsumerForm';
import {KongEntities} from 'modules/kong/components/entity/KongEntities';
import {EntityTable} from 'modules/kong/components/entity/EntityTable';


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
