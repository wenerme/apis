import React from 'react';
import { Divider } from 'antd';
import { Trans } from 'react-i18next';
import { KongRouteList } from '../route/KongRouteList';
import { buildSubEntityService } from '../../../apis/utils';
import { getKongService } from '../../../apis/client';
import { ServiceForm } from './ServiceForm';

export const ServiceViewer: React.FC<{ initialValues?; onSubmit? }> = ({ initialValues, onSubmit }) => {
  if (!initialValues) {
    return null;
  }
  return (
    <div>
      <ServiceForm initialValues={initialValues} onSubmit={onSubmit} />

      <Divider>
        <Trans>路由</Trans>
      </Divider>
      <KongRouteList entityService={buildSubEntityService(getKongService, 'ServiceRoute', initialValues.id)} />
    </div>
  );
};
