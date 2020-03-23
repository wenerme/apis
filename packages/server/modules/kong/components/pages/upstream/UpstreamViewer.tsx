import React from 'react';
import { UpstreamForm } from 'modules/kong/components/pages/upstream/UpstreamForm';
import { EntityTable } from 'modules/kong/components/entity/EntityTable';
import { KongEntities } from 'modules/kong/components/entity/KongEntities';

export const UpstreamViewer: React.FC<{ initialValues?; onSubmit? }> = ({ initialValues, onSubmit }) => {
  if (!initialValues) {
    return null;
  }
  return (
    <div>
      <UpstreamForm initialValues={initialValues} onSubmit={onSubmit} />
      <EntityTable entity={KongEntities.UpstreamTarget} parentId={initialValues.id} />
    </div>
  );
};
