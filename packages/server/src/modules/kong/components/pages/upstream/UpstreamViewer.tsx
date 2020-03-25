import React from 'react';
import { UpstreamForm } from './UpstreamForm';
import { EntityTable } from '../../entity/EntityTable';
import { KongEntities } from '../../entity/KongEntities';

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
