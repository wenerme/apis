import React, { useMemo } from 'react';
import { normalizeColumns } from 'src/libs/antds/table/normal';
import URI from 'urijs';
import { createEntityColumns, KongEntityTable } from '../../entity/KongEntityTable';
import { ServiceForm } from './ServiceForm';
import { ServiceViewer } from './ServiceViewer';

export const KongServiceList: React.FC = (props) => {
  const columns = useMemo(
    () =>
      normalizeColumns(
        createEntityColumns([
          {
            title: '目标',
            width: 250,
            className: 'no-wrap',
            render(v, r, i): any {
              const { host, protocol, path, port } = r;
              const uri = new URI('');
              Object.entries({ host, protocol, path, port }).forEach(([k, v]) => {
                if (v) {
                  uri[k](v);
                }
              });
              return uri.toString();
            },
          },
          { dataIndex: 'retries', title: '重试', width: 80 },
          { dataIndex: 'connect_timeout', title: '链接超时', width: 100 },
          { dataIndex: 'write_timeout', title: '写超时', width: 100 },
          { dataIndex: 'read_timeout', title: '读超时', width: 100 },
        ]),
      ),
    [],
  );

  return (
    <KongEntityTable
      label={'服务'}
      name={'Service'}
      columns={columns}
      editor={ServiceForm}
      viewer={ServiceViewer}
      {...props}
    />
  );
};
