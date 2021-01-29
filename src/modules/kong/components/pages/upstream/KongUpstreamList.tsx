import React, { useMemo } from 'react';
import { normalizeColumns } from 'src/libs/antds/table/normal';
import { createEntityColumns, KongEntityTable } from '../../entity/KongEntityTable';
import { KongUpstreamEntity } from '../../../apis/types';
import { UpstreamForm } from './UpstreamForm';
import { UpstreamViewer } from './UpstreamViewer';

export const KongUpstreamList: React.FC = () => {
  const columns = useMemo(
    () =>
      normalizeColumns<KongUpstreamEntity>(
        createEntityColumns([
          { key: 'algorithm', title: '算法', width: 120 },
          { key: 'hash_on', title: 'Hash', width: 120 },
          { key: 'hash_fallback', title: 'Hash Fallback', width: 120 },
          { key: 'hash_on_cookie_path', title: 'Hash Cookie 路径', width: 180 },
        ]),
      ),
    [],
  );
  return (
    <KongEntityTable label="上游" name="Upstream" columns={columns} editor={UpstreamForm} viewer={UpstreamViewer} />
  );
};
