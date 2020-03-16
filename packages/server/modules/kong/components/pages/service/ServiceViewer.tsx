import React from 'react';
import {Divider} from 'antd';
import {Trans} from 'react-i18next';
import {KongRouteList} from 'modules/kong/components/pages/route/KongRouteList';
import {buildSubEntityService} from 'modules/kong/apis/utils';
import {getKongService} from 'modules/kong/apis/client';
import {ServiceForm} from 'modules/kong/components/pages/service/ServiceForm';

export const ServiceViewer: React.FC<{ initialValues?, onSubmit? }> = ({initialValues, onSubmit}) => {
  if (!initialValues) {
    return null
  }
  return (
    <div>
      <ServiceForm initialValues={initialValues} onSubmit={onSubmit} />

      <Divider><Trans>路由</Trans></Divider>
      <KongRouteList
        entityService={buildSubEntityService(getKongService, 'ServiceRoute', initialValues.id)}
      />
    </div>
  )
}
